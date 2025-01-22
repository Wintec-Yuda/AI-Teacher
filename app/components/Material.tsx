import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import MarkdownWithProperHtml from "./MarkdownWithProperHtml";
import data from "../../data.json";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setSchoolLevel,
  setTopic,
  setSubTopic,
  addMaterial,
  setMaterials,
} from "../lib/redux/slices/materialSlice";
import { GenerateMaterialPayload } from "../types/payload";
import { setActiveTab, setLoading } from "../lib/redux/slices/globalSlice";
import axios from "axios";
import { RootState } from "../types/state";
import { setIsAnswered, setNumQuestions, setQuestions, setUserAnswers } from "../lib/redux/slices/questionSlice";
import { setFeedback, setIsResetted } from "../lib/redux/slices/answerSlice";

const Material: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { materials, topic, subTopic, schoolLevel, language } = useSelector(
    (state: RootState) => state.material
  );
  const { loading } = useSelector((state: RootState) => state.global);

  const dispatch = useDispatch();

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    dispatch(setLanguage(event.target.value as string));
  };

  const handleChangeSchoolLevel = (event: SelectChangeEvent<string>) => {
    const newSchoolLevel = event.target.value as string;
    dispatch(setSchoolLevel(newSchoolLevel));
    dispatch(setTopic(""));
    dispatch(setSubTopic(""));
  };

  const handleChangeTopic = (event: SelectChangeEvent<string>) => {
    const newTopic = event.target.value as string;
    dispatch(setTopic(newTopic));
    dispatch(setSubTopic(""));
  };

  const handleChangeSubTopic = (event: SelectChangeEvent<string>) => {
    dispatch(setSubTopic(event.target.value as string));
  };

  const handleGenerateMaterials = async () => {
    dispatch(setLoading(true));
    try {
      const latestMaterial = materials[materials.length - 1];

      const { data } = await axios.post("/api/generate-material", {
        topic,
        subTopic,
        schoolLevel,
        language,
        latestMaterial,
      } as GenerateMaterialPayload);

      dispatch(addMaterial(data.data));
      setCurrentPage(materials.length + 1);

      window.scrollTo({ top: 170, behavior: "smooth" });
    } catch {
      alert("Failed to generate material");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleRestartLearning = () => {
    dispatch(setMaterials([]));
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
  };

  const dataMaterial: {
    [key: string]: {
      [key: string]: {
        subtopics: string[];
      };
    };
  } = data;

  const availableTopics = schoolLevel
    ? (Object.keys(dataMaterial[schoolLevel as keyof typeof data]) as string[])
    : [];

  const availableSubTopics =
    schoolLevel && topic
      ? dataMaterial[schoolLevel as keyof typeof data][topic].subtopics
      : [];

  const itemsPerPage = 1;
  const totalPages = Math.ceil(materials.length / itemsPerPage);
  const currentMaterials = materials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {materials.length === 0 && (
        <Box marginBottom={0}>
          <FormControl fullWidth disabled={materials.length > 0 || loading}>
            <InputLabel className="text-[#444444]">Language</InputLabel>
            <Select
              value={language}
              onChange={handleChangeLanguage}
              label="Select Language"
              className="text-[#444444] bg-[#F4E5C2] hover:[#F4E5C2]/80 rounded shadow-lg shadow-black/20"
            >
              <MenuItem value="indonesia" className="text-[#444444]">
                Bahasa Indonesia
              </MenuItem>
              <MenuItem value="english" className="text-[#444444]">
                English
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {materials.length === 0 && (
        <Box marginBottom={3}>
          <FormControl fullWidth disabled={materials.length > 0 || loading}>
            <InputLabel className="text-[#444444]">School Level</InputLabel>
            <Select
              value={schoolLevel}
              onChange={handleChangeSchoolLevel}
              label="Select School Level"
              className="text-[#444444] bg-[#F4E5C2] hover:[#F4E5C2]/80 rounded shadow-lg shadow-black/20"
            >
              {Object.keys(data).map((level, index) => (
                <MenuItem key={index} value={level} className="text-[#444444]">
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {schoolLevel && materials.length === 0 && (
        <Box marginBottom={3}>
          <FormControl fullWidth disabled={materials.length > 0 || loading}>
            <InputLabel className="text-[#444444]">Topic</InputLabel>
            <Select
              value={topic}
              onChange={handleChangeTopic}
              label="Select Topic"
              className="text-[#444444] bg-[#F4E5C2] hover:[#F4E5C2]/80 rounded shadow-lg shadow-black/20"
            >
              {availableTopics.map((topic, index) => (
                <MenuItem key={index} value={topic} className="text-[#444444]">
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {schoolLevel && topic && materials.length === 0 && (
        <Box marginBottom={3}>
          <FormControl fullWidth>
            <InputLabel className="text-[#444444]">Sub Topic</InputLabel>
            <Select
              value={subTopic}
              onChange={handleChangeSubTopic}
              label="Select Sub Topic"
              disabled={materials.length > 0 || loading}
              className="text-[#444444] bg-[#F4E5C2] hover:[#F4E5C2]/80 rounded shadow-lg shadow-black/20"
            >
              {availableSubTopics.map((subTopic: string, index: number) => (
                <MenuItem
                  key={index}
                  value={subTopic}
                  className="text-[#444444]"
                >
                  {subTopic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {materials.length === 0 ? (
        <Box textAlign="center" marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateMaterials}
            disabled={loading || !topic || !subTopic}
            className="font-semibold bg-[#F4E5C2] hover:[#F4E5C2]/80 rounded shadow-lg shadow-black/20 text-[#444444]"
          >
            {loading ? <CircularProgress size={24} /> : "Generate Material"}
          </Button>
        </Box>
      ) : (
        <Box textAlign="center" marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRestartLearning}
            disabled={loading}
            className="font-semibold bg-[#444444] hover:bg-[#444444]/80 text-[#F4E5C2] rounded shadow-lg shadow-black/20"
          >
            {loading ? <CircularProgress size={24} /> : "Restart Learning"}
          </Button>
        </Box>
      )}

      {materials.length > 0 && (
        <>
          <Box marginBottom={2} textAlign="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>

          <Paper
            elevation={3}
            style={{
              padding: "20px",
              marginTop: "20px",
              backgroundColor: "#F4E5C2",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              className="font-bold text-[#444444]"
            >
              Material
            </Typography>
            {materials.length > 0 ? (
              <MarkdownWithProperHtml content={currentMaterials[0]} />
            ) : (
              <Typography variant="body1" className="text-[#444444]">
                No material available for this page.
              </Typography>
            )}

            <Box textAlign="center" marginBottom={3} marginTop={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateMaterials}
                disabled={loading || !topic || !subTopic}
                className="font-semibold bg-[#444444] hover:bg-[#444444]/80 text-[#F4E5C2] rounded shadow-lg shadow-black/20"
              >
                {loading ? <CircularProgress size={24} /> : "Continue Learning"}
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default Material;
