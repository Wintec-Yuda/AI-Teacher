"use client";

import { Container, Typography, Tabs, Tab } from "@mui/material";
import Questions from "./components/Questions";
import CheckAnswers from "./components/CheckAnswers";
import Material from "./components/Material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "./lib/redux/slices/globalSlice";

export default function Home() {
  const { activeTab } = useSelector((state: any) => state.global);

  const dispatch = useDispatch();

  const handleChangeActiveTab = (event: React.SyntheticEvent, newActiveTab: number) => {
    dispatch(setActiveTab(newActiveTab));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        AI Teacher
      </Typography>
      <Tabs value={activeTab} onChange={handleChangeActiveTab} centered>
        <Tab label="Material" />
        <Tab label="Questions" />
        <Tab label="Check Answers" />
      </Tabs>

      {activeTab === 0 && <Material />}
      {activeTab === 1 && <Questions />}
      {activeTab === 2 && <CheckAnswers />}
    </Container>
  );
}
