"use client";

import { useState } from "react";
import { Container, Typography, Tabs, Tab } from "@mui/material";
import Questions from "./components/Questions";
import CheckAnswers from "./components/CheckAnswers";
import Material from "./components/Material";

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
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        AI Teacher
      </Typography>
      <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} centered>
        <Tab label="Material" />
        <Tab label="Questions" />
        <Tab label="Check Answers" />
      </Tabs>

      {activeTab === 0 && (
        <Material
          selectedLanguage={selectedLanguage}
          selectedSchoolLevel={selectedSchoolLevel}
          selectedTopic={selectedTopic}
          selectedDifficultyLevel={selectedDifficultyLevel}
          material={material}
          loading={loading}
          setSelectedLanguage={setSelectedLanguage}
          setSelectedSchoolLevel={setSelectedSchoolLevel}
          setSelectedTopic={setSelectedTopic}
          setSelectedDifficultyLevel={setSelectedDifficultyLevel}
          handleGenerateMaterial={handleGenerateMaterial}
        />
      )}

      {activeTab === 1 && (
        <Questions
          questions={questions}
          userAnswers={userAnswers}
          numQuestions={numQuestions}
          loading={loading}
          setNumQuestions={setNumQuestions}
          setUserAnswers={setUserAnswers}
          handleGenerateQuestions={handleGenerateQuestions}
        />
      )}

      {activeTab === 2 && (
        <CheckAnswers
          feedback={feedback}
          loading={loading}
          handleCheckAnswers={handleCheckAnswers}
        />
      )}
    </Container>
  );
}
