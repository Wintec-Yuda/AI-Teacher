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
    <Container maxWidth="lg" className="bg-[#F4E5C2] min-h-screen p-6 rounded-lg shadow-lg">
      <Typography variant="h3" align="center" gutterBottom className="font-bold bg-[#F4E5C2] hover:[#F4E5C2]/80 rounded shadow-lg shadow-black/20 text-[#444444]">
        AI Teacher
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleChangeActiveTab}
        centered
        TabIndicatorProps={{ style: { backgroundColor: "#111111" } }}
        className="mb-6 "
      >
        <Tab label="Material" className="font-semibold rounded text-[#444444] hover:text-[#444444]/50 focus:outline-none" />
        <Tab label="Questions" className="font-semibold rounded text-[#444444] hover:text-[#444444]/50 focus:outline-none" />
        <Tab label="Check Answers" className="font-semibold rounded text-[#444444] hover:text-[#444444]/50 focus:outline-none" />
      </Tabs>

      <div className="space-y-6">
        {activeTab === 0 && <Material />}
        {activeTab === 1 && <Questions />}
        {activeTab === 2 && <CheckAnswers />}
      </div>
    </Container>
  );
}
