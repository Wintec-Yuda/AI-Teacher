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
    const { topic, subTopic, schoolLevel, difficultyLevel, language } =
      await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a well-structured prompt incorporating all inputs
    const prompt = `
    You are an AI expert educator. Create detailed, self-contained study material for the topic: "${topic}" and subtopic: "${subTopic}", tailored to the school level: "${schoolLevel}" and difficulty level: "${difficultyLevel}". The study material should meet the following criteria:

- Clarity and Simplicity: The material should be clear, easy to understand, and suitable for beginners. Avoid overly technical language or jargon that may confuse the target audience.
- Structure and Organization: Provide well-structured content that is easy to follow, starting with fundamental concepts and progressing to more complex ideas.
- Step-by-Step Explanations: Each concept should be explained with step-by-step breakdowns to ensure gradual learning.
- Real-World Examples: Include real-world examples and practical applications of the concepts to make the material relatable and engaging.
- Practical Guidance: Offer hands-on activities or practical exercises that allow learners to apply what they have learned in a real-world context.
- Independent Learning: The content should facilitate independent learning, so that students can understand and complete the material without requiring external guidance.
- Relevance: Ensure the content is up-to-date, accurate, and directly relevant to the topic, keeping in mind current trends and knowledge in the field.
- Language and Terminology: Use language and terminology that is appropriate for the audience, ensuring accessibility and understanding at the specified school level and difficulty.
- Visuals: Instead of using images, incorporate icons or diagrams to support explanations where necessary, enhancing comprehension and engagement.

  Please write the material in the language: "${language}", ensuring clarity and appropriateness for the target audience.
  Make sure the content is up-to-date, well-structured, and provides a mix of theory and interactive elements like exercises or quizzes.
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
