import React, { useState, useEffect } from "react";
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
import data from '../../data.json'; // Assuming you saved the topics data here

const difficultyLevels = Array.from({ length: 10 }, (_, index) => index + 1);

interface MaterialProps {
  selectedLanguage: string;
  selectedSchoolLevel: string;
  selectedTopic: string;
  selectedSubTopic: string;
  selectedDifficultyLevel: number;
  materials: string[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  currentMaterials: string[];
  setSelectedLanguage: (value: string) => void;
  setSelectedSchoolLevel: (value: string) => void;
  setSelectedTopic: (value: string) => void;
  setSelectedSubTopic: (value: string) => void;
  setSelectedDifficultyLevel: (value: number) => void;
  handleGenerateMaterial: () => void;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Material: React.FC<MaterialProps> = ({
  selectedLanguage,
  selectedSchoolLevel,
  selectedTopic,
  selectedSubTopic,
  selectedDifficultyLevel,
  materials,
  loading,
  totalPages,
  currentPage,
  currentMaterials,
  setSelectedLanguage,
  setSelectedSchoolLevel,
  setSelectedTopic,
  setSelectedSubTopic,
  setSelectedDifficultyLevel,
  handleGenerateMaterial,
  handleChangePage,
}) => {

const availableTopics = selectedSchoolLevel
  ? Object.keys(data[selectedSchoolLevel])
  : [];

const availableSubTopics =
  selectedSchoolLevel && selectedTopic
    ? data[selectedSchoolLevel][selectedTopic].subtopics
    : [];

  return (
    <>
      <Box marginBottom={3}>
        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as string)}
            label="Select Language"
          >
            <MenuItem value="indonesia">Bahasa Indonesia</MenuItem>
            <MenuItem value="english">English</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box marginBottom={3}>
        <FormControl fullWidth>
          <InputLabel>School Level</InputLabel>
          <Select
            value={selectedSchoolLevel}
            onChange={(e) => setSelectedSchoolLevel(e.target.value)}
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

      <Box marginBottom={3}>
        <FormControl fullWidth>
          <InputLabel>Topic</InputLabel>
          <Select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
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

      <Box marginBottom={3}>
        <FormControl fullWidth>
          <InputLabel>Sub Topic</InputLabel>
          <Select
            value={selectedSubTopic}
            onChange={(e) => setSelectedSubTopic(e.target.value)}
            label="Select Sub Topic"
            disabled={!selectedTopic}
          >
            {availableSubTopics.map((subTopic: string, index: number) => (
              <MenuItem key={index} value={subTopic}>
                {subTopic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box marginBottom={3}>
        <FormControl fullWidth>
          <InputLabel>Difficulty Level</InputLabel>
          <Select
            value={selectedDifficultyLevel}
            onChange={(e) => setSelectedDifficultyLevel(Number(e.target.value))}
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
            onClick={handleGenerateMaterial}
            disabled={loading || !selectedTopic || !selectedSchoolLevel}
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
              Material {currentPage}
            </Typography>
            {Array.isArray(currentMaterials) && currentMaterials.length > 0 ? (
              currentMaterials.map((material, index) => (
                <MarkdownWithProperHtml content={material} key={index} />
              ))
            ) : (
              <Typography>No material available for this page.</Typography>
            )}

            <Box textAlign="center" marginBottom={3} marginTop={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateMaterial}
                disabled={loading || !selectedTopic || !selectedSchoolLevel}
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
