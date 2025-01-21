import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY as string;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}

export async function POST(req: Request) {
  try {
    const { topic, subTopic, schoolLevel, language, latestMaterial } =
      await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    ${latestMaterial ? latestMaterial + "\n\nContinuing from the previous material...\n" : ""}
You are an AI expert educator specializing in engaging and innovative study materials. Your task is to create a detailed, structured, and interactive learning module on the topic "${topic}" with the subtopic "${subTopic}", designed for "${schoolLevel}" students.  

This study material must be unique and engaging, avoiding repetitive explanations across different instances. Use diverse instructional techniques in every section.  

Guidelines for Effective Content:
1. Creative Introduction (Hook the Learner)  
   - Begin with an intriguing question, short story, fun fact, or real-world dilemma to grab the student's interest.  
   - Clearly state the learning objectives in an engaging manner.

2. Concept Explanation with Different Teaching Methods  
   - Explain concepts using at least two different methods, such as:  
     - Scenario-based learning (present a problem and solve it step by step).  
     - Comparative learning (compare concepts with something familiar).  
     - Conversational style (explain as if talking to a curious student).  
   - Avoid the same structural format across different generations.

3. Dynamic Real-World Applications  
   - Instead of generic examples, include:  
     - A case study relevant to the student’s daily life.  
     - An experiment or activity they can try at home.  
     - A historical or futuristic perspective of the topic.

4. Interactive & Hands-on Learning  
   - Provide at least three engaging activities, such as:  
     - A challenge with multiple possible solutions  
     - Fill-in-the-blank interactive story  
     - An analogy-matching game  
   - Vary these activities in every new instance.

5. Critical Thinking and Open-Ended Questions  
   - Include a thought-provoking question that does not have a single right answer.  
   - Encourage students to debate or discuss a controversial aspect of the topic.

6. Summarization in Unique Formats  
   - End with a creative summary format, such as:  
     - A poetic recap  
     - A comic strip outline  
     - A tweet-length explanation challenge  
     - A dialogue between two imaginary students discussing the topic  

7. Final Challenge and Exploration  
   - Include a mystery problem or project-based task where students must apply what they learned.  
   - Offer additional resources (books, websites, videos) for self-learning.  

Output Requirements:  
- The study material must be written in **"${language}"**.
- Ensure it is **engaging, easy to follow, and appropriate for the specified school level**.
- Maintain a **logical flow** with smooth transitions between sections.

Ensure that the study material is not repetitive and that each generated version brings something new to the student’s learning experience.
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
