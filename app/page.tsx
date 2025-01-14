"use client";

import { useState } from "react";
import { Container, Typography, Tabs, Tab } from "@mui/material";
import Questions from "./components/Questions";
import CheckAnswers from "./components/CheckAnswers";
import Material from "./components/Material";

export default function Home() {
  const [materials, setMaterials] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>("");
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<string>("");
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] =
    useState<number>(1);
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState("indonesia"); // "id" untuk Bahasa Indonesia, "en" untuk English
  const [currentPage, setCurrentPage] = useState(0);

  const handleGenerateMaterial = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic,
          subTopic: selectedSubTopic,
          schoolLevel: selectedSchoolLevel,
          difficultyLevel: selectedDifficultyLevel,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      materials.push(data.material);

      setCurrentPage((prevPage) => prevPage + 1);
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
          subTopic: selectedSubTopic,
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

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const itemsPerPage = 1; // You can adjust this based on how many materials per page you want
  const totalPages = Math.ceil(materials.length / itemsPerPage);
  // Slice the materials to show only the current page's materials
  const currentMaterials = materials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          selectedSubTopic={selectedSubTopic}
          selectedDifficultyLevel={selectedDifficultyLevel}
          materials={materials}
          loading={loading}
          setSelectedLanguage={setSelectedLanguage}
          setSelectedSchoolLevel={setSelectedSchoolLevel}
          setSelectedTopic={setSelectedTopic}
          setSelectedSubTopic={setSelectedSubTopic}
          setSelectedDifficultyLevel={setSelectedDifficultyLevel}
          handleGenerateMaterial={handleGenerateMaterial}
          totalPages={totalPages}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          currentMaterials={currentMaterials}
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
