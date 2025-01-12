"use client";

import React from "react";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";

interface CheckAnswersProps {
  feedback: string;
  loading: boolean;
  handleCheckAnswers: () => void;
}

const CheckAnswers: React.FC<CheckAnswersProps> = ({
  feedback,
  loading,
  handleCheckAnswers,
}) => {
  return (
    <>
      <Box textAlign="center" marginTop={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCheckAnswers}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Answers"}
        </Button>
      </Box>

      {feedback && (
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Feedback:
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }}>{feedback}</Typography>
        </Paper>
      )}
    </>
  );
};

export default CheckAnswers;
