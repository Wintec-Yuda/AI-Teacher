import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY as string; 

export async function POST(req: Request) {
  try {
    const { questions, userAnswers, language } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert math educator tasked with evaluating student responses. Please analyze the following math problems and provide detailed feedback:

PROBLEMS:
${questions
  .map(
    (q: string, i: number) => `
question ${i + 1} [${questions[i]}]:
${q}
Student's Answer: ${userAnswers[i]}
`
  )
  .join("\n")}

Please provide:

1. Scoring Breakdown:
- Problem-wise Scores: Detailed scoring for each individual question.
- Point Deduction Explanation: Clear explanations for any points deducted, including the reasoning behind each deduction.
- Final Score: The total score, normalized to a 100-point scale, reflecting overall performance.


2. DETAILED FEEDBACK
For each problem:
- Correctness assessment
- Step-by-step solution explanation
- Common misconceptions (if applicable)
- Tips for improvement

3. OVERALL EVALUATION
- Strengths demonstrated
- Areas for improvement
- Suggested practice topics

Language: ${language}

Formatting Guidelines:
- Use clear headings and subheadings
- Include step-by-step explanations
- Highlight key concepts
- Use mathematical notation when appropriate
- Maintain consistent language throughout (${language})
- Keep tone encouraging and constructive

If visual explanations would be helpful, please include simple ASCII diagrams or suggest appropriate visual aids.

Please ensure all feedback is:
- Age-appropriate
- Clear and concise
- Constructive
- Aligned with educational best practices
- Written in ${language}
`;

    const result = await model.generateContent(prompt);

    const data = result.response.text();

    return NextResponse.json({
      status: "success",
      message: "Answers checked successfully",
      data,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to check answers.",
      },
      { status: 500 }
    );
  }
}
