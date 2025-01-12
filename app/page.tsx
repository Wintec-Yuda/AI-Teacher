"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";

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

const difficultyLevels = Array.from({ length: 10 }, (_, index) => index + 1); // Levels 1-10

export default function Home() {
  const [material, setMaterial] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<string>("");
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] =
    useState<number>(1);
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState("indonesia"); // "id" untuk Bahasa Indonesia, "en" untuk English

  const availableTopics = selectedSchoolLevel
    ? (topicsBySchoolLevel[
        selectedSchoolLevel as keyof typeof topicsBySchoolLevel
      ] as string[])
    : [];

  const handleGenerateMaterial = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic,
          schoolLevel: selectedSchoolLevel,
          difficultyLevel: selectedDifficultyLevel,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();
      setMaterial(data.material);
    } catch (error) {
      console.error("Error generating material:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numQuestions,
          topic: selectedTopic,
          schoolLevel: selectedSchoolLevel,
          difficultyLevel: selectedDifficultyLevel,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();
      const questionsArray = data.questions
        .split("\n")
        .filter((q: string) => q.trim() !== "");
      setQuestions(questionsArray);
      setUserAnswers(Array(questionsArray.length).fill(""));
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAnswers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/correct-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions,
          userAnswers,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      console.error("Error checking answers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        AI Teacher
      </Typography>

      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Material" />
        <Tab label="Questions" />
        <Tab label="Check Answers" />
      </Tabs>

      {/* Select Language */}
      {activeTab === 0 && (
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
      )}

      {/* Select School Level */}
      {activeTab === 0 && (
        <Box marginBottom={3}>
          <FormControl fullWidth>
            <InputLabel>School Level</InputLabel>
            <Select
              value={selectedSchoolLevel}
              onChange={(e) => setSelectedSchoolLevel(e.target.value as string)}
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
      )}

      {/* Materi Tab */}
      {activeTab === 0 && (
        <>
          {/* Select Topic */}
          <Box marginBottom={3}>
            <FormControl fullWidth>
              <InputLabel>Topic</InputLabel>
              <Select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value as string)}
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

          {/* Select Difficulty Level */}
          <Box marginBottom={3}>
            <FormControl fullWidth>
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                value={selectedDifficultyLevel}
                onChange={(e) =>
                  setSelectedDifficultyLevel(Number(e.target.value))
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

          {/* Generate Material Button */}
          {!material && (
            <Box textAlign="center" marginBottom={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateMaterial}
                disabled={
                  loading ||
                  !selectedTopic ||
                  !selectedSchoolLevel ||
                  !selectedDifficultyLevel
                }
              >
                {loading ? <CircularProgress size={24} /> : "Generate Material"}
              </Button>
            </Box>
          )}

          {material && (
            <Paper
              elevation={3}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Typography variant="h5" gutterBottom>
                Study Material:
              </Typography>
              <Typography style={{ whiteSpace: "pre-wrap" }}>
                {material}
              </Typography>
            </Paper>
          )}
        </>
      )}

      {/* Questions Tab */}
      {activeTab === 1 && (
        <>
          <Box marginBottom={3}>
            <TextField
              label="Number of Questions"
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 1 }}
            />
          </Box>

          {/* Generate Questions Button */}
          <Box textAlign="center" marginBottom={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerateQuestions}
              disabled={
                loading ||
                !selectedTopic ||
                !selectedSchoolLevel ||
                !selectedDifficultyLevel
              }
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Proceed to Questions"
              )}
            </Button>
          </Box>

          {/* Questions */}
          {questions.length > 0 && (
            <Paper
              elevation={3}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Typography variant="h5" gutterBottom>
                Questions:
              </Typography>
              {questions.map((q, i) => (
                <Box key={i} marginBottom={2}>
                  <Typography>{`${q}`}</Typography>
                  {/* Input for Answer */}
                  <TextField
                    label={`Answer ${i + 1}`}
                    variant="outlined"
                    fullWidth
                    value={userAnswers[i] || ""}
                    onChange={(e) => {
                      const updatedAnswers = [...userAnswers];
                      updatedAnswers[i] = e.target.value;
                      setUserAnswers(updatedAnswers);
                    }}
                    style={{ marginTop: "10px" }}
                  />
                </Box>
              ))}
            </Paper>
          )}
        </>
      )}

      {/* Check Answers Tab */}
      {activeTab === 2 && (
        <>
          {/* Submit Answers Button */}
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

          {/* Feedback */}
          {feedback && (
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Feedback:
              </Typography>
              <Typography style={{ whiteSpace: "pre-wrap" }}>
                {feedback}
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
}
