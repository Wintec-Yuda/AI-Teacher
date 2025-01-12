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

interface MaterialProps {
  topicsBySchoolLevel: { [key: string]: string[] };
  selectedLanguage: string;
  selectedSchoolLevel: string;
  selectedTopic: string;
  selectedDifficultyLevel: number;
  material: string;
  loading: boolean;
  setSelectedSchoolLevel: (value: string) => void;
  setSelectedTopic: (value: string) => void;
  setSelectedDifficultyLevel: (value: number) => void;
  handleGenerateMaterial: () => void;
}

const Material: React.FC<MaterialProps> = ({
  topicsBySchoolLevel,
  selectedLanguage,
  selectedSchoolLevel,
  selectedTopic,
  selectedDifficultyLevel,
  material,
  loading,
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
