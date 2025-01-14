import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Ensure the environment variable for the API key is set
const apiKey = process.env.GOOGLE_API_KEY as string; // Sesuaikan dengan API yang digunakan

if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}

// Define a POST function for generating questions
export async function POST(req: Request) {
  try {
    const { numQuestions, topic, subTopic, schoolLevel, difficultyLevel, language } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a more detailed prompt to generate questions with additional parameters
    const prompt = `

      You are an experienced and highly skilled educator. Please Create ${numQuestions} questions thoughtfully crafted questions on the topic of "${topic}" with a focus on the subtopic "${subTopic}". The questions should adhere to the following criteria:

- School Level: Ensure the questions are appropriate for the school level of "${schoolLevel}".
- Difficulty: Adjust the difficulty level to be "${difficultyLevel}", providing a balance that challenges students without overwhelming them.
- Language: The questions must be in "${language}" and tailored to the language proficiency of the students.
- Critical Thinking: Each question should stimulate critical thinking, requiring students to apply concepts rather than merely recall information. The questions should avoid being overly simplistic or rote and should encourage deeper problem-solving and analysis.
- Clarity: All questions should be clear, concise, and free from ambiguity, ensuring that students can easily understand what is being asked.
- Variety: Include a variety of question formats—such as multiple-choice, short-answer, and open-ended questions—so that different aspects of students' understanding are assessed.
- Scaffolded Learning: Arrange the questions in a progressive manner, beginning with foundational concepts and advancing to more complex problems. This structure should help students build their knowledge and confidence step by step.
- Visuals: If visuals are necessary, use icons instead of images to help illustrate concepts, ensuring that the visuals are clear and appropriate for the content.

Please provide only the questions in a numbered list. Do not include answers or explanations, as the goal is to stimulate thought and foster deeper learning.

    `;

    // Generate content with the AI model
    const result = await model.generateContent(prompt);

    const questions = result.response.text();

    // Handle case where questions could not be generated
    if (!questions) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to generate questions.",
        },
        { status: 500 }
      );
    }

    // Return generated questions
    return NextResponse.json({
      status: "success",
      message: "Questions generated successfully.",
      questions,
    });
  } catch (error: any) {
    // Catch and log any unexpected errors
    console.error("Error generating questions:", error);

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
