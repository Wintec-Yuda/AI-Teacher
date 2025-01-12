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
    const { numQuestions, topic, schoolLevel, difficultyLevel, language } = await req.json();

    // Validate inputs
    // if (!numQuestions || typeof numQuestions !== "number" || numQuestions <= 0) {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: numQuestions must be a positive number.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!topic || typeof topic !== "string") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: topic must be a valid string.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!schoolLevel || typeof schoolLevel !== "string") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: schoolLevel must be a valid string.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!difficultyLevel || typeof difficultyLevel !== "string") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: difficultyLevel must be a valid string.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Optional: Add validation for language if needed
    // if (!language || (language !== 'en' && language !== 'id')) {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: language must be either 'en' or 'id'.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a more detailed prompt to generate questions with additional parameters
    const prompt = `
      You are a highly skilled teacher. Create ${numQuestions} questions on the topic of "${topic}".
      The questions should be appropriate for the school level: "${schoolLevel}" and at the difficulty level: "${difficultyLevel}".
      The questions should be provided in the language: "${language}".
      Provide only the problems in a numbered list without answers.
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
