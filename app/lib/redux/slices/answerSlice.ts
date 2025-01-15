import { AnswerState } from "@/app/types/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AnswerState = {
  feedback: "",
  isResetted: false,
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setIsResetted: (state, action: PayloadAction<boolean>) => {
      state.isResetted = action.payload;
    },
    setFeedback: (state, action: PayloadAction<string>) => {
      state.feedback = action.payload;
    },
  }
});

export const { setIsResetted, setFeedback } = answerSlice.actions;

export default answerSlice.reducer;
