import React from "react";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import MarkdownWithProperHtml from "./MarkdownWithProperHtml";

interface CheckAnswersProps {
  feedback: string;
  loading: boolean;
  handleCheckAnswers: () => void;
  materials: string[];
  questions: string[];
  userAnswers: string[];
}

const CheckAnswers: React.FC<CheckAnswersProps> = ({
  feedback,
  loading,
  handleCheckAnswers,
  materials,
  questions,
  userAnswers,
}) => {
  return (
    <>
      <Box textAlign="center" marginTop={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCheckAnswers}
          disabled={loading || materials.length == 0 || questions.length == 0 || userAnswers.length == 0}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Answers"}
        </Button>
      </Box>

      {feedback && (
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Feedback:
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            <MarkdownWithProperHtml content={feedback} />
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default CheckAnswers;
