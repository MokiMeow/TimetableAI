import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
} from '@mui/material';

const TableGenerate = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [tableData, setTableData] = useState([]);

  const generateTable = () => {
    const newTableData = Array(rows).fill().map(() => Array(columns).fill(''));
    setTableData(newTableData);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = value;
    setTableData(newTableData);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Table Generator
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Rows"
              type="number"
              value={rows}
              onChange={(e) => setRows(Math.max(1, parseInt(e.target.value)))}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Columns"
              type="number"
              value={columns}
              onChange={(e) => setColumns(Math.max(1, parseInt(e.target.value)))}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" onClick={generateTable}>
              Generate Table
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {tableData.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Table
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {Array(columns).fill().map((_, index) => (
                      <TableCell key={index}>Column {index + 1}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <TableCell key={colIndex}>
                          <TextField
                            fullWidth
                            value={cell}
                            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default TableGenerate;