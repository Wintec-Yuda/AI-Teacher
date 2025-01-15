export interface MaterialState {
  materials: string[];
  topic: string;
  subTopic: string;
  schoolLevel: string;
  difficultyLevel: number;
  language: string;
}

export interface QuestionState {
  questions: string[];
  userAnswers: string[];
  numQuestions: number;
  isAnswered: boolean;
}

export interface AnswerState {
  feedback: string;
  isResetted: boolean;
}

export interface globalState {
  loading: boolean;
  activeTab: number
}