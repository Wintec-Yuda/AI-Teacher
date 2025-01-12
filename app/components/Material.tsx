"use client";

import React from "react";
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

const difficultyLevels = Array.from({ length: 10 }, (_, index) => index + 1);
const topicsBySchoolLevel = {
  TK: ["Basic Math Operations", "English", "Art", "Music"],
  SD: ["Basic Math Operations", "English", "Science", "History", "Geography"],
  SMP: ["Algebra", "Geometry", "Biology", "Physics", "History"],
  SMA: [
    "Algebra",
    "Geometry",
    "Trigonometry",
    "Physics",
    "Chemistry",
    "Biology",
  ],
  SMK: ["Computer Science", "Physics", "Chemistry", "English", "Mathematics"],
  Diploma: ["Computer Science", "Mathematics", "Chemistry", "Physics"],
  "Sarjana 1": [
    "Calculus",
    "Computer Science",
    "Physics",
    "Economics",
    "Literature",
  ],
  "Sarjana 2": [
    "Advanced Physics",
    "Advanced Calculus",
    "Machine Learning",
    "Philosophy",
  ],
  "Sarjana 3": [
    "Quantum Physics",
    "Artificial Intelligence",
    "Research Methods",
    "Ethics",
  ],
  Doctor: ["Research Methods", "Advanced Statistics", "Philosophy", "Medicine"],
};

interface MaterialProps {
  selectedLanguage: string;
  selectedSchoolLevel: string;
  selectedTopic: string;
  selectedDifficultyLevel: number;
  material: string;
  loading: boolean;
  setSelectedLanguage: (value: string) => void;
  setSelectedSchoolLevel: (value: string) => void;
  setSelectedTopic: (value: string) => void;
  setSelectedDifficultyLevel: (value: number) => void;
  handleGenerateMaterial: () => void;
}

const Material: React.FC<MaterialProps> = ({
  selectedLanguage,
  selectedSchoolLevel,
  selectedTopic,
  selectedDifficultyLevel,
  material,
  loading,
  setSelectedLanguage,
  setSelectedSchoolLevel,
  setSelectedTopic,
  setSelectedDifficultyLevel,
  handleGenerateMaterial,
}) => {
  const availableTopics = selectedSchoolLevel
    ? topicsBySchoolLevel[
        selectedSchoolLevel as keyof typeof topicsBySchoolLevel
      ]
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
            {Object.keys(topicsBySchoolLevel).map((level, index) => (
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

      {!material && (
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

      {material && (
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Study Material:
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }}>{material}</Typography>
        </Paper>
      )}
    </>
  );
};

export default Material;
