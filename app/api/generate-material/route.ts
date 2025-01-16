import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY as string;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}

export async function POST(req: Request) {
  try {
    const { topic, subTopic, schoolLevel, language } =
      await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an AI expert educator. Please create detailed, self-contained study material for the topic: "${topic}" and subtopic: "${subTopic}", tailored to the school level: "${schoolLevel}". The study material should meet the following criteria:
1. Clarity and Simplicity: The material should be straightforward and easy to understand, suitable for beginners. Avoid technical jargon or overly complex language that could confuse students.
2. Structure and Organization: Organize the content in a logical and coherent way, starting with basic concepts and progressively introducing more advanced topics. Each section should flow naturally to the next.
3. Step-by-Step Explanations: Provide clear, step-by-step breakdowns of concepts to ensure that learners can grasp each idea before moving to the next. Each explanation should be simple and direct, guiding the student through the learning process.
4. Real-World Examples: Integrate practical examples that demonstrate how the topic and subtopic apply to real-world situations. This will help students connect theoretical knowledge with tangible applications.
5. Practical Guidance: Include exercises, activities, or practical applications that allow students to directly apply what they've learned. This hands-on approach will help reinforce key concepts.
6. Independent Learning: Ensure the content is designed for independent learning. Students should be able to understand and progress through the material on their own, with clear instructions and well-paced challenges.
7. Relevance and Accuracy: The material must be up-to-date, accurate, and relevant to the topic and subtopic. Stay current with the latest trends, knowledge, and advancements in the field, ensuring that the content aligns with the latest educational standards.
8. Language and Terminology: Use language and terminology that is appropriate for the target audience. Ensure accessibility by adjusting complexity to match the specified school level and difficulty. Avoid overly technical language unless it’s necessary for the learning process.
9. Visuals: Use icons, diagrams, or simplified visuals (instead of images) to support explanations. These visuals should be clear, relevant, and enhance the student's understanding of complex concepts.
Please write the material in "${language}", ensuring that it is clear, engaging, and accessible for the target audience. The material should include a combination of theoretical explanations and interactive elements like quizzes, exercises, or discussion prompts to facilitate deeper learning and engagement.
`;


    const result = await model.generateContent(prompt);

    const data = result.response.text();

    return NextResponse.json({
      status: "success",
      message: "Material generated successfully.",
      data,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to generate material.",
      },
      { status: 500 }
    );
  }
}
