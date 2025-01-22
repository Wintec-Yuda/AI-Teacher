import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import MarkdownWithProperHtml from "./MarkdownWithProperHtml";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setLoading } from "../lib/redux/slices/globalSlice";
import { setFeedback, setIsResetted } from "../lib/redux/slices/answerSlice";
import { CheckAnswersPayload } from "../types/payload";
import {
  setLanguage,
  setMaterials,
  setSchoolLevel,
  setSubTopic,
  setTopic,
} from "../lib/redux/slices/materialSlice";
import {
  setIsAnswered,
  setNumQuestions,
  setQuestions,
  setUserAnswers,
} from "../lib/redux/slices/questionSlice";
import axios from "axios";
import { RootState } from "../types/state";

const CheckAnswers: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.global);
  const { feedback, isResetted } = useSelector(
    (state: RootState) => state.answer
  );
  useSelector((state: RootState) => state.material);
  const { questions, userAnswers, isAnswered } = useSelector(
    (state: RootState) => state.question
  );
  const { language } = useSelector((state: RootState) => state.material);

  const dispatch = useDispatch();

  const handleCheckAnswers = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post("/api/check-answers", {
        questions,
        userAnswers,
        language,
      } as CheckAnswersPayload);
      dispatch(setFeedback(data.data));
      dispatch(setIsResetted(true));
    } catch {
      alert("Failed to check answers");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResetted = () => {
    dispatch(setTopic(""));
    dispatch(setSubTopic(""));
    dispatch(setSchoolLevel(""));
    dispatch(setLanguage("indonesia"));
    dispatch(setNumQuestions(5));
    dispatch(setFeedback(""));
    dispatch(setIsAnswered(false));
    dispatch(setIsResetted(false));
    dispatch(setActiveTab(0));
    dispatch(setQuestions([]));
    dispatch(setUserAnswers([]));
    dispatch(setMaterials([]));
  };

  return (
    <>
      <Box className="text-center mt-8">
        {isResetted ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetted}
            disabled={loading}
            className="font-semibold w-full py-2 bg-[#444444] hover:bg-[#444444]/80 text-[#F4E5C2] rounded shadow-lg shadow-black/20"
          >
            {loading ? <CircularProgress size={24} /> : "Reset"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheckAnswers}
            disabled={loading || !isAnswered}
            className="font-semibold w-full py-2 bg-[#444444] hover:bg-[#444444]/80 text-[#F4E5C2] rounded shadow-lg shadow-black/20"
          >
            {loading ? <CircularProgress size={24} /> : "Submit Answers"}
          </Button>
        )}
      </Box>

      {feedback && (
        <Paper elevation={3} className="p-6 mt-6 bg-[#F4E5C2] rounded-lg shadow-lg">
          <Typography
            variant="h5"
            gutterBottom
            className="text-[#444444] font-semibold"
          >
            Feedback:
          </Typography>
          <MarkdownWithProperHtml content={feedback} />
        </Paper>
      )}
    </>
  );
};

export default CheckAnswers;
