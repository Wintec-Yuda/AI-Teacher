import { QuestionState } from '@/app/types/state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: QuestionState = {
  questions: [],
  userAnswers: [],
  numQuestions: 5,
  isAnswered: false,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<string[]>) => {
      state.questions = action.payload;
    },
    setUserAnswers: (state, action: PayloadAction<string[]>) => {
      state.userAnswers = action.payload;
    },
    setNumQuestions: (state, action: PayloadAction<number>) => {
      state.numQuestions = action.payload;
    },
    setIsAnswered: (state, action: PayloadAction<boolean>) => {
      state.isAnswered = action.payload;
    },
  }
});

export const {
  setQuestions,
  setUserAnswers,
  setNumQuestions,
  setIsAnswered,
} = questionSlice.actions;

export default questionSlice.reducer;
