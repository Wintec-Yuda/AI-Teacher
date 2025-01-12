import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Ensure the environment variable for the API key is set
const apiKey = process.env.GOOGLE_API_KEY as string; // Pastikan ini menggunakan API Key yang sesuai

if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}

// Define a POST function for generating study material
export async function POST(req: Request) {
  try {
    const { topic, schoolLevel, difficultyLevel, language } = await req.json();

    // Validate input
    // if (!topic || typeof topic !== "string") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: 'topic' must be a string.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!schoolLevel || typeof schoolLevel !== "string") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: 'schoolLevel' must be a string.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // if (!difficultyLevel || typeof difficultyLevel !== "string") {
    //   return NextResponse.json(
    //     {
    //       status: "error",
    //       message: "Invalid input: 'difficultyLevel' must be a string.",
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

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a well-structured prompt incorporating all inputs
    const prompt = `
      You are a teacher. Create a detailed study material about the topic: "${topic}", 
      appropriate for the school level: "${schoolLevel}", 
      at the difficulty level: "${difficultyLevel}",
      in the language: "${language}".
      The material should be well-structured and easy to understand for beginners.
    `;

    // Generate content with the AI model
    const result = await model.generateContent(prompt);

    const material = result.response.text(); // Access text result

    // Handle case where material could not be generated
    if (!material) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to generate material.",
        },
        { status: 500 }
      );
    }

    // Return generated study material
    return NextResponse.json({
      status: "success",
      message: "Material generated successfully.",
      material,
    });
  } catch (error: any) {
    // Catch and log any unexpected errors
    console.error("Error generating material:", error);

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
