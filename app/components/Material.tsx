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
  setDifficultyLevel,
  addMaterial,
} from "../lib/redux/slices/materialSlice";
import { GenerateMaterialPayload } from "../types/payload";
import { setLoading } from "../lib/redux/slices/globalSlice";
import axios from "axios";

const difficultyLevels = Array.from({ length: 10 }, (_, index) => index + 1);

const Material: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { materials, topic, subTopic, schoolLevel, difficultyLevel, language } =
    useSelector((state: any) => state.material);
  const { loading } = useSelector((state: any) => state.global);

  const dispatch = useDispatch();

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLanguage(event.target.value as string));
  };

  const handleChangeSchoolLevel = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSchoolLevel = event.target.value as string;
    dispatch(setSchoolLevel(newSchoolLevel));
    dispatch(setTopic(""));
    dispatch(setSubTopic(""));
  };

  const handleChangeTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTopic = event.target.value as string;
    dispatch(setTopic(newTopic));
    dispatch(setSubTopic(""));
  };

  const handleChangeSubTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSubTopic(event.target.value as string));
  };

  const handleGenerateMaterials = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post("/api/generate-material", {
        topic,
        subTopic,
        schoolLevel,
        difficultyLevel,
        language,
      } as GenerateMaterialPayload);

      dispatch(addMaterial(data.data));
      setCurrentPage(materials.length + 1);
    } catch (error: any) {
      console.log("Failed to generate material");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const availableTopics = schoolLevel
    ? (Object.keys(data[schoolLevel as keyof typeof data]) as string[])
    : [];

  const availableSubTopics =
    schoolLevel && topic ? data[schoolLevel][topic].subtopics : [];

  const itemsPerPage = 1;
  const totalPages = Math.ceil(materials.length / itemsPerPage);
  const currentMaterials = materials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Box marginBottom={3}>
        <FormControl fullWidth disabled={materials.length > 0 || loading}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={handleChangeLanguage}
            label="Select Language"
          >
            <MenuItem value="indonesia">Bahasa Indonesia</MenuItem>
            <MenuItem value="english">English</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box marginBottom={3}>
        <FormControl fullWidth disabled={materials.length > 0 || loading}>
          <InputLabel>School Level</InputLabel>
          <Select
            value={schoolLevel}
            onChange={handleChangeSchoolLevel}
            label="Select School Level"
          >
            {Object.keys(data).map((level, index) => (
              <MenuItem key={index} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {schoolLevel && (
        <Box marginBottom={3}>
          <FormControl fullWidth disabled={materials.length > 0 || loading}>
            <InputLabel>Topic</InputLabel>
            <Select
              value={topic}
              onChange={handleChangeTopic}
              label="Select Topic"
            >
              {availableTopics.map((topic, index) => (
                <MenuItem key={index} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {schoolLevel && topic && (
        <Box marginBottom={3}>
          <FormControl fullWidth disabled={materials.length > 0 || loading}>
            <InputLabel>Sub Topic</InputLabel>
            <Select
              value={subTopic}
              onChange={handleChangeSubTopic}
              label="Select Sub Topic"
            >
              {availableSubTopics.map((subTopic: string, index: number) => (
                <MenuItem key={index} value={subTopic}>
                  {subTopic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      <Box marginBottom={3}>
        <FormControl fullWidth disabled={materials.length > 0 || loading}>
          <InputLabel>Difficulty Level</InputLabel>
          <Select
            value={difficultyLevel}
            onChange={(event) =>
              dispatch(setDifficultyLevel(event.target.value))
            }
            label="Select Difficulty Level"
          >
            {difficultyLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {materials.length === 0 && (
        <Box textAlign="center" marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateMaterials}
            disabled={loading || !topic || !subTopic}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Material"}
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

          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Material
            </Typography>
            {materials.length > 0 ? (
              <MarkdownWithProperHtml content={currentMaterials[0]} />
            ) : (
              <Typography>No material available for this page.</Typography>
            )}

            <Box textAlign="center" marginBottom={3} marginTop={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateMaterials}
                disabled={loading || !topic || !subTopic}
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
