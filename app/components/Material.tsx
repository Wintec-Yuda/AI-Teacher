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
import Pagination from "@mui/material/Pagination";
import MarkdownWithProperHtml from "./MarkdownWithProperHtml";

const difficultyLevels = Array.from({ length: 10 }, (_, index) => index + 1);
const topicsBySchoolLevel = {
  TK: ["Basic Math Operations", "English", "Art", "Music"],
  SD: ["Basic Math Operations", "English", "Science", "History", "Geography"],
  SMP: ["Algebra", "Geometry", "Biology", "Physics", "History"],
  SMA: [
    "Algebra",
    "Geometry",
    "English",
    "Trigonometry",
    "Physics",
    "Chemistry",
    "Biology",
  ],
  SMK: ["Computer Science", "Physics", "Chemistry", "English", "Mathematics"],
  Diploma: ["Computer Science", "Mathematics", "Chemistry", "English", "Physics", "Electrical engineering", "Internet Of Things"],
  "Sarjana 1": [
    "Calculus",
    "Computer Science",
    "Physics",
    "Economics",
    "Literature",
    "English",
  ],
  "Sarjana 2": [
    "Advanced Physics",
    "Advanced Calculus",
    "Machine Learning",
    "Philosophy",
    "English",
  ],
  "Sarjana 3": [
    "Quantum Physics",
    "Artificial Intelligence",
    "Research Methods",
    "Ethics",
    "Philosophy",
    "English",
  ],
  Doctor: ["Research Methods", "Advanced Statistics", "Philosophy", "Medicine", "English"],
};

interface MaterialProps {
  selectedLanguage: string;
  selectedSchoolLevel: string;
  selectedTopic: string;
  selectedDifficultyLevel: number;
  materials: string[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  currentMaterials: string[];
  setSelectedLanguage: (value: string) => void;
  setSelectedSchoolLevel: (value: string) => void;
  setSelectedTopic: (value: string) => void;
  setSelectedDifficultyLevel: (value: number) => void;
  handleGenerateMaterial: () => void;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Material: React.FC<MaterialProps> = ({
  selectedLanguage,
  selectedSchoolLevel,
  selectedTopic,
  selectedDifficultyLevel,
  materials,
  loading,
  totalPages,
  currentPage,
  currentMaterials,
  setSelectedLanguage,
  setSelectedSchoolLevel,
  setSelectedTopic,
  setSelectedDifficultyLevel,
  handleGenerateMaterial,
  handleChangePage,
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
