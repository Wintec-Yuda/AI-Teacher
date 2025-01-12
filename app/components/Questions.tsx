"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

interface QuestionsProps {
  questions: string[];
  userAnswers: string[];
  numQuestions: number;
  loading: boolean;
  setNumQuestions: (value: number) => void;
  setUserAnswers: (value: string[]) => void;
  handleGenerateQuestions: () => void;
}

const Questions: React.FC<QuestionsProps> = ({
  questions,
  userAnswers,
  numQuestions,
  loading,
  setNumQuestions,
  setUserAnswers,
  handleGenerateQuestions,
}) => {
  return (
    <>
      <Box marginBottom={3}>
        <TextField
          label="Number of Questions"
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          fullWidth
          inputProps={{ min: 1 }}
        />
      </Box>

      <Box textAlign="center" marginBottom={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGenerateQuestions}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Questions"}
        </Button>
      </Box>

      {questions.length > 0 && (
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Questions:
          </Typography>
          {questions.map((q, i) => (
            <Box key={i} marginBottom={2}>
              <Typography>
                <ReactMarkdown>{q}</ReactMarkdown>
              </Typography>
              <TextField
                label={`Answer ${i + 1}`}
                variant="outlined"
                fullWidth
                value={userAnswers[i] || ""}
                multiline
                onChange={(e) => {
                  const updatedAnswers = [...userAnswers];
                  updatedAnswers[i] = e.target.value;
                  setUserAnswers(updatedAnswers);
                }}
                style={{ marginTop: "10px" }}
              />
            </Box>
          ))}
        </Paper>
      )}
    </>
  );
};

export default Questions;
