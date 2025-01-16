"use client";

import { Container, Typography, Tabs, Tab } from "@mui/material";
import Questions from "./components/Questions";
import CheckAnswers from "./components/CheckAnswers";
import Material from "./components/Material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "./lib/redux/slices/globalSlice";
import { RootState } from "./types/state";

export default function Home() {
  const { activeTab } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  const handleChangeActiveTab = (event: React.SyntheticEvent, newActiveTab: number) => {
    dispatch(setActiveTab(newActiveTab));
  };

  return (
    <Container maxWidth="lg" className="bg-gradient-to-r from-green-200 to-blue-100 min-h-screen p-6 rounded-lg shadow-lg">
      <Typography variant="h3" align="center" gutterBottom className="font-bold bg-gradient-to-r from-teal-200 to-green-300 hover:from-teal-300 hover:to-green-600 rounded shadow-lg shadow-green-500/50">
        AI Teacher
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleChangeActiveTab}
        centered
        TabIndicatorProps={{ style: { backgroundColor: "#00bcf0" } }}
        className="mb-6"
      >
        <Tab label="Material" className="font-semibold rounded hover:bg-cyan-300 focus:outline-none" />
        <Tab label="Questions" className="font-semibold rounded hover:bg-cyan-300 focus:outline-none" />
        <Tab label="Check Answers" className="font-semibold rounded hover:bg-cyan-300 focus:outline-none" />
      </Tabs>

      <div className="space-y-6">
        {activeTab === 0 && <Material />}
        {activeTab === 1 && <Questions />}
        {activeTab === 2 && <CheckAnswers />}
      </div>
    </Container>
  );
}
