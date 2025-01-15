import { configureStore } from '@reduxjs/toolkit';
import materialReducer from './slices/materialSlice';
import questionReducer from './slices/questionSlice';
import answerReducer from './slices/answerSlice';
import globalReducer from './slices/globalSlice';

const store = configureStore({
  reducer: {
    material: materialReducer,
    question: questionReducer,
    answer: answerReducer,
    global: globalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store;
