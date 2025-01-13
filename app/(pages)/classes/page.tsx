'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';

interface ClassData {
  className: string;
  code: string;
  languages: string[];
  levels: number[];
  schoolLevel: string;
  students: string[];
  teacherId: string;
  topics: string[];
}

const classData: ClassData = {
  className: 'Match class',
  code: 'ABC123',
  languages: ['indonesia', 'english'],
  levels: [1, 2],
  schoolLevel: 'SD',
  students: ['student1', 'student2', 'student3'], // Dummy students for demonstration
  teacherId: 'teacher1',
  topics: ['math', 'english'],
};

// Generate combination options
const generateCombinations = (
  languages: string[],
  topics: string[],
  levels: number[]
) => {
  const combinations: { label: string; value: string }[] = [];
  topics.forEach((topic, index) => {
    combinations.push({
      label: `${topic} - Level ${levels[index]} - ${languages[index]}`,
      value: `${languages[index]}_${topic}_${levels[index]}`,
    });
  });
  return combinations;
};

const Classes = () => {
  const combinations = generateCombinations(
    classData.languages,
    classData.topics,
    classData.levels
  );

  const [selectedCombination, setSelectedCombination] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [newClassName, setNewClassName] = useState<string>('');
  const [classes, setClasses] = useState<ClassData[]>([classData]);

  // Generate random code
  const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  // Simulate getting teacherId from auth cookie
  const getTeacherIdFromCookie = () => 'teacher1'; // Replace with actual cookie logic

  // Handle Create Class
  const handleCreateClass = () => {
    const newClass: ClassData = {
      className: newClassName,
      code: generateCode(),
      languages: [], // Default value
      levels: [], // Default value
      schoolLevel: '-', // Default value
      students: [], // No students initially
      teacherId: getTeacherIdFromCookie(),
      topics: [], // Default value
    };
    setClasses([...classes, newClass]);
    setOpen(false); // Close modal
    setNewClassName(''); // Reset input
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Modal for Create Class */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Class</DialogTitle>
        <DialogContent>
          <TextField
            label="Class Name"
            fullWidth
            margin="normal"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateClass} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Classes List */}
      <Card sx={{ maxWidth: 800, mx: 'auto', boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Classes
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => setOpen(true)}
          >
            Add New Class
          </Button>

          {/* Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filter by Topic, Level, Language</InputLabel>
            <Select
              value={selectedCombination}
              onChange={(e) => setSelectedCombination(e.target.value)}
              label="Filter by Language, Topic, Level"
            >
              {combinations.map((combination, index) => (
                <MenuItem key={index} value={combination.value}>
                  {combination.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Class List */}
          {classes.map((classItem, index) => (
            <Card key={index} sx={{ mb: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6">{classItem.className}</Typography>
                <Typography variant="body2">Code: {classItem.code}</Typography>
                <Typography variant="body2">Teacher ID: {classItem.teacherId}</Typography>
                <Typography variant="body2">School Level: {classItem.schoolLevel}</Typography>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Classes;
