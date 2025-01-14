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

interface QuestionsProps {
  questions: string[];
  userAnswers: string[];
  numQuestions: number;
  loading: boolean;
  setNumQuestions: (value: number) => void;
  setUserAnswers: (value: string[]) => void;
  handleGenerateQuestions: () => void;
  materials: string[];
}

const Questions: React.FC<QuestionsProps> = ({
  questions,
  userAnswers,
  numQuestions,
  loading,
  setNumQuestions,
  setUserAnswers,
  handleGenerateQuestions,
  materials,
}) => {
  // State untuk error validation
  const [errors, setErrors] = useState<boolean[]>([]);

  // Validasi sebelum mengirimkan jawaban
  const handleValidation = () => {
    const newErrors = questions.map((_, i) => !userAnswers[i]?.trim());
    setErrors(newErrors);
    return !newErrors.some((error) => error);
  };

  // Submit jawaban
  const handleSubmitAnswers = () => {
    if (handleValidation()) {
      // Proses kirim jawaban
      console.log("Jawaban berhasil dikirim:", userAnswers);
    } else {
      console.log("Harap isi semua jawaban.");
    }
  };

  return (
    <>
      <Box marginBottom={3}>
        <TextField
          label="Number of Questions"
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          fullWidth
          inputProps={{ min: 2 }}
        />
      </Box>

      <Box textAlign="center" marginBottom={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGenerateQuestions}
          disabled={loading || materials.length == 0 || questions.length > 0}
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
              <Typography variant="h6" gutterBottom>
                Question {i + 1}:
              </Typography>
              <MarkdownWithProperHtml content={q} />
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

                  // Reset error saat pengguna mengetik
                  const updatedErrors = [...errors];
                  updatedErrors[i] = !e.target.value.trim();
                  setErrors(updatedErrors);
                }}
                error={!!errors[i]}
                helperText={errors[i] ? "Answer cannot be empty." : ""}
                style={{ marginTop: "10px" }}
              />
            </Box>
          ))}
          <Box textAlign="center" marginTop={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitAnswers}
            >
              Submit Answers
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Questions;
