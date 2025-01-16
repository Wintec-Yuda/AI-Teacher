import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY as string;

if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}

export async function POST(req: Request) {
  try {
    const { numQuestions, topic, subTopic, schoolLevel, language } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Please create ${numQuestions} essay-style questions on the topic of "${topic}" with a focus on the subtopic "${subTopic}". The questions should be designed to stimulate critical thinking and require students to engage deeply with the material. Ensure that the questions meet the following criteria:
1. Grade Level: Tailor the questions to the appropriate cognitive level for "${schoolLevel}" students, considering their developmental stage and reasoning abilities.
2. Difficulty: Challenging students to think critically and apply their knowledge, without making them excessively difficult or overwhelming.
3. Language: All questions should be in "${language}" and appropriate for the language proficiency of the students. Ensure clarity and precision in the phrasing.
4. Critical Thinking: The questions should encourage students to:
   - Analyze concepts in depth, breaking down ideas into their components.
   - Evaluate arguments, solutions, or methods, providing reasoned judgments.
   - Synthesize information from various sources or perspectives, creating new connections or solutions.
   - Reflect on the broader implications of the topic on personal, societal, or global levels.
5. Clarity & Precision: Ensure all questions are clear and concise, without ambiguity, allowing students to focus on critical thinking and argumentation.
6. Progressive Complexity: Arrange the questions in a manner that starts with foundational concepts and gradually leads to more advanced questions that require deeper analysis and synthesis.
7. Question Variety: Provide a mix of essay question types, such as:
   - Comparative analysis: Ask students to compare and contrast two different approaches, theories, or ideas.
   - Evaluative reasoning: Challenge students to assess the strengths and weaknesses of a particular solution or argument.
   - Problem-solving: Present a real-world issue related to the topic and ask students to propose a solution.
   - Reflection: Ask students to reflect on the personal, societal, or global impact of the topic and critically examine its relevance.
8. Justification of Answers: Each question should encourage students to justify their answers with logical reasoning, evidence, and examples to support their conclusions.
Please provide only the essay questions in a numbered list. Do not include answers or explanations.
`;

    const result = await model.generateContent(prompt);

    const data = result.response.text();

    return NextResponse.json({
      status: "success",
      message: "Questions generated successfully.",
      data,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to generate questions.",
      },
      { status: 500 }
    );
  }
}
