import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY as string; // Pastikan API key tidak null atau undefined.

export async function POST(req: Request) {
  try {
    const { questions, userAnswers, language } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a detailed prompt with the provided language
    const prompt = `
You are an expert math educator. Below are math problems along with my answers. 
Evaluate each answer, provide the correct solution if the answer is wrong, and include a detailed explanation for the correct solution.

Problems:
${questions.map((q: string, i: number) => `${i + 1}. ${q}`).join("\n")}

My Answers:
${userAnswers.map((a: string, i: number) => `${i + 1}. ${a}`).join("\n")}

Instructions:
1. Evaluate each answer and assign points based on correctness and the difficulty of the question.
2. Each question has a specific score range (1 - 20) depending on its difficulty.
3. For each incorrect answer, provide the correct answer and a clear, step-by-step explanation of how to arrive at the correct solution.
4. For each correct answer, state: "Correct. Explanation: [detailed explanation of the correct solution]."
5. For each incorrect answer, state: "Incorrect. The correct answer is [correct answer]. Explanation: [detailed explanation of the correct solution]."
6. Assign partial points if the answer is close to the correct one, with a percentage of the full score.

Scoring System:
Question Weight:
  - Each question is assigned a specific weight between 1 and 20 points based on its difficulty.
Answer Scoring:
  - Correct Answer: Full score awarded.
  - Incorrect Answer: No points awarded.
  - Partial Answer: Award partial points if the answer is close to correct, based on the level of accuracy.

Final Score Calculation:
  - Total Questions: ${questions.length}.
  - Correct Answers: The number of correct answers is [correctAnswers].
  - Total Score: The final score is calculated as the sum of points for each question, which is then normalized to a range of 1 - 100.

Additionally, provide a summary of my performance:
- Number of Correct Answers: [correctAnswers]
- Final Score: [score] (range 1 - 100)
- Summary: [Overall assessment of my performance, strengths, and areas for improvement].

Visuals:
- If any visuals are needed in the solution, please use icons to enhance understanding.

Please make sure to provide helpful and constructive feedback in the chosen language.  
${
  language === "indonesia"
    ? "Pastikan memberikan umpan balik yang membangun dalam bahasa Indonesia."
    : "Please make sure to provide helpful and constructive feedback in English."
}
`;


    const result = await model.generateContent(prompt);

    const feedback = result.response.text();

    return NextResponse.json({
      status: "success",
      message: "Answers checked successfully",
      feedback,
    });
  } catch (error: any) {
    console.error("Error during processing:", error); // Log for debugging
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
