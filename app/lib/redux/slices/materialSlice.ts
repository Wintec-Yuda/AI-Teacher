import { MaterialState } from "@/app/types/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MaterialState = {
  materials: [],
  topic: "",
  subTopic: "",
  schoolLevel: "",
  difficultyLevel: 1,
  language: "indonesia",
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setMaterials: (state, action: PayloadAction<string[]>) => {
      state.materials = action.payload;
    },
    addMaterial: (state, action: PayloadAction<string>) => {
      state.materials.push(action.payload);
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setSubTopic: (state, action: PayloadAction<string>) => {
      state.subTopic = action.payload;
    },
    setSchoolLevel: (state, action: PayloadAction<string>) => {
      state.schoolLevel = action.payload;
    },
    setDifficultyLevel: (state, action: PayloadAction<number>) => {
      state.difficultyLevel = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  }
});

export const {
  setMaterials,
  addMaterial,
  setTopic,
  setSubTopic,
  setSchoolLevel,
  setDifficultyLevel,
  setLanguage,
} = materialSlice.actions;

export default materialSlice.reducer;
