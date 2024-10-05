import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Reports from './pages/Reports';
import GeneratePage from './generate/page'; // Ensure this import is correct
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <Navigation>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/generate" element={<GeneratePage />} /> {/* Ensure this route is correct */}
                </Routes>
              </Navigation>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;