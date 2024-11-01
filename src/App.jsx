import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import Navbar from './components/Navbar';
import AllBoards from './pages/AllBoards';
import SingleBoardPage from './pages/SingleBoardPage';
// import ErrorPage from './pages/ErrorPage';
// import theme from './theme';

const globalStyles = {
  '*': {
    fontFamily: theme.typography.fontFamily,
    margin: 0,
    padding: 0,
  },
  body: {
    background: theme.palette.background.default,
  },
  '*::-webkit-scrollbar': {
    width: theme.scrollbar.width,
    height: theme.scrollbar.width,
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: theme.scrollbar.thumbColor,
    borderRadius: '4px',
    cursor: 'grab',
  },
  '*::-webkit-scrollbar-track': {
    background: theme.scrollbar.backgroundColor,
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Navbar />
        <Routes>
          <Route path="/" element={<AllBoards />} />
          <Route path="/boards" element={<AllBoards />} />
          <Route path="/board/:id" element={<SingleBoardPage />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
