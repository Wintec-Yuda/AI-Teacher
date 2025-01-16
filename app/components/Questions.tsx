import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import MarkdownWithProperHtml from "./MarkdownWithProperHtml";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setLoading } from "../lib/redux/slices/globalSlice";
import {
  setIsAnswered,
  setNumQuestions,
  setQuestions,
  setUserAnswers,
} from "../lib/redux/slices/questionSlice";
import { GenerateQuestionsPayload } from "../types/payload";
import axios from "axios";
import { RootState } from "../types/state";

const Questions: React.FC = () => {
  const [errors, setErrors] = useState<boolean[]>([]);

  const { materials, topic, subTopic, schoolLevel, language } = useSelector(
    (state: RootState) => state.material
  );
  const { questions, numQuestions, userAnswers, isAnswered } = useSelector(
    (state: RootState) => state.question
  );
  const { loading } = useSelector((state: RootState) => state.global);

  const dispatch = useDispatch();

  const handleValidation = () => {
    const newErrors = questions.map(
      (_: string, i: number) => !userAnswers[i]?.trim()
    );
    setErrors(newErrors);
    return !newErrors.some((error: boolean) => error);
  };

  const handleSureAnswers = () => {
    if (handleValidation()) {
      dispatch(setActiveTab(2));
      dispatch(setIsAnswered(true));
    }
  };

  const handleSetNumQuestions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNumQuestions = Number(event.target.value);
    dispatch(setNumQuestions(newNumQuestions));
  };

  const handleGenerateQuestions = async () => {
    dispatch(setLoading(true));

    try {
      const { data } = await axios.post("/api/generate-questions", {
        topic,
        subTopic,
        schoolLevel,
        language,
        numQuestions,
      } as GenerateQuestionsPayload);

      const questionsArray = data.data
        .split("\n")
        .filter((q: string) => q.trim() !== "");
      setQuestions(questionsArray);

      dispatch(setQuestions(questionsArray));
    } catch {
      console.log("Failed to generate questions");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAnswers = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[i] = event.target.value;
    dispatch(setUserAnswers(updatedAnswers));
    const updatedErrors = [...errors];
    updatedErrors[i] = !event.target.value.trim();
    setErrors(updatedErrors);
  };

  return (
    <>
      <Box marginBottom={3}>
        <TextField
          label="Number of Questions"
          type="number"
          value={numQuestions}
          onChange={handleSetNumQuestions}
          fullWidth
          inputProps={{ min: 2 }}
          className="mb-4"
        />
        <Box textAlign="center" marginBottom={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerateQuestions}
            disabled={loading || materials.length === 0 || questions.length > 0}
            className="font-semibold w-full py-2 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600"
          >
            {loading ? <CircularProgress size={24} /> : "Generate Questions"}
          </Button>
        </Box>
      </Box>

      {questions.length > 0 && (
        <Paper elevation={3} className="p-6 bg-white rounded-lg shadow-lg mb-6">
          <Typography variant="h5" gutterBottom className="text-gray-700 font-semibold">
            Questions:
          </Typography>
          {questions.map((q: string, i: number) => (
            <Box key={i} marginBottom={2}>
              <Typography variant="h6" className="text-gray-800 mb-2">
                Question {i + 1}:
              </Typography>
              <MarkdownWithProperHtml content={q} />
              <TextField
                label={`Answer ${i + 1}`}
                variant="outlined"
                fullWidth
                value={userAnswers[i] || ""}
                multiline
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleAnswers(event, i)
                }
                error={!!errors[i]}
                helperText={errors[i] ? "Answer cannot be empty." : ""}
                className="mt-2"
              />
            </Box>
          ))}
          <Box textAlign="center" marginTop={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSureAnswers}
              disabled={loading || isAnswered}
              className="font-semibold w-full py-2 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600"
            >
              Sure with the answers!
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Questions;
