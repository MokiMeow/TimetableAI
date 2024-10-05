'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Paper = dynamic(() => import('@mui/material/Paper'), { ssr: false });
const Table = dynamic(() => import('@mui/material/Table'), { ssr: false });
const TableBody = dynamic(() => import('@mui/material/TableBody'), { ssr: false });
const TableCell = dynamic(() => import('@mui/material/TableCell'), { ssr: false });
const TableContainer = dynamic(() => import('@mui/material/TableContainer'), { ssr: false });
const TableHead = dynamic(() => import('@mui/material/TableHead'), { ssr: false });
const TableRow = dynamic(() => import('@mui/material/TableRow'), { ssr: false });
const Typography = dynamic(() => import('@mui/material/Typography'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
const Grid = dynamic(() => import('@mui/material/Grid'), { ssr: false });

const TimetableGenerator: React.FC = () => {
  const [numCourses, setNumCourses] = useState(5);
  const [timetable, setTimetable] = useState<any[][]>([]);
  const [courses, setCourses] = useState<any[]>([
    { code: 'CS101', name: 'Introduction to Programming', faculty: 'Dr. Smith', type: 'Lecture' },
    { code: 'CS102', name: 'Data Structures', faculty: 'Prof. Johnson', type: 'Lecture' },
    { code: 'CS103', name: 'Web Technology Lab', faculty: 'Dr. Brown', type: 'Lab' },
    { code: 'CS104', name: 'Database Management', faculty: 'Prof. Davis', type: 'Lecture' },
    { code: 'CS105', name: 'Mini Project', faculty: 'Dr. Wilson', type: 'Project' },
  ]);

  const rooms = ['Room 101', 'Room 102', 'Lab A', 'Lab B', 'Seminar Hall'];
  const timeSlots = ['8:30 - 9:20', '9:20 - 10:10', '10:10 - 11:00', '11:20 - 12:10', '12:10 - 1:00', '1:50 - 2:40', '2:40 - 3:30'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const generateTimetable = () => {
    const newTimetable = days.map(() =>
      timeSlots.map(() => {
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        return { ...randomCourse, room: randomRoom };
      })
    );
    setTimetable(newTimetable);
  };

  const getCellStyle = (courseType: string) => {
    switch (courseType) {
      case 'Lecture':
        return { backgroundColor: '#e3f2fd' };
      case 'Lab':
        return { backgroundColor: '#e8f5e9' };
      case 'Project':
        return { backgroundColor: '#fff3e0' };
      default:
        return {};
    }
  };

  return (
    <Paper sx={{ p: 3, overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        College Timetable Generator
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Number of Courses"
            type="number"
            value={numCourses}
            onChange={(e) => setNumCourses(Math.max(1, parseInt(e.target.value)))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" onClick={generateTimetable}>
            Generate Timetable
          </Button>
        </Grid>
      </Grid>

      {timetable.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Generated Timetable</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time / Day</TableCell>
                  {days.map((day) => (
                    <TableCell key={day}>{day}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timeSlots.map((slot, slotIndex) => (
                  <TableRow key={slot}>
                    <TableCell>{slot}</TableCell>
                    {days.map((day, dayIndex) => {
                      const cell = timetable[dayIndex]?.[slotIndex];
                      return (
                        <TableCell key={`${day}-${slot}`} style={cell ? getCellStyle(cell.type) : {}}>
                          {cell ? (
                            <>
                              <div>{cell.code}</div>
                              <div>{cell.name}</div>
                              <div>{cell.faculty}</div>
                              <div>{cell.room}</div>
                            </>
                          ) : (
                            'Free'
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Paper>
  );
};

export default TimetableGenerator;