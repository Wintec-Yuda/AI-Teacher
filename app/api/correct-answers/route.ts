import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY as string; // Pastikan API key tidak null atau undefined.

export async function POST(req: Request) {
  try {
    const { questions, userAnswers, language } = await req.json();

    // Validasi input
    // if (!Array.isArray(questions) || !Array.isArray(userAnswers)) {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: questions and userAnswers should be arrays.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (questions.length !== userAnswers.length) {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "The number of questions and user answers must be the same.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!language || typeof language !== "string") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: 'language' must be a string.",
    //     },
    //     { status: 400 }
    //   );
    // }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a detailed prompt with the provided language
    const prompt = `
You are a math teacher. Here are some math problems with answers from a student. 
Evaluate each answer, provide the correct answer for any wrong answers, 
and include an explanation for the correct solution.

Problems:
${questions.map((q: string, i: number) => `${i + 1}. ${q}`).join("\n")}

Student Answers:
${userAnswers.map((a: string, i: number) => `${i + 1}. ${a}`).join("\n")}

Language: ${language}

Provide feedback in the following format:
- For correct answers: "Correct. Explanation: [detailed explanation]."
- For incorrect answers: "Incorrect. The correct answer is [correct answer]. Explanation: [detailed explanation of the correct solution]."

Additionally, calculate the final score (out of 100) based on the number of correct answers. The final score is calculated as follows:

- Number of Correct Answers: [correctAnswers]
- Total Number of Questions: ${questions.length}
- Final Score: [score]%

Provide a summary of the student's performance, including the total score and an overall assessment. Ensure the explanations are clear and helpful for the student to learn.
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
