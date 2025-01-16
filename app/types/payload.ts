export interface GenerateMaterialPayload {
  topic: string;
  subTopic: string;
  schoolLevel: string;
  language: string;
}

export interface CheckAnswersPayload {
  questions: string[];
  userAnswers: string[];
  language: string;
}

export interface GenerateQuestionsPayload {
  numQuestions: number;
  topic: string;
  subTopic: string;
  schoolLevel: string;
  language: string;
}