import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import AllBoards from './pages/AllBoards';
import SingleBoard from './pages/SingleBoard';
import Error from './pages/Error';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<AllBoards />} />
          <Route path="/boards" element={<AllBoards />} />
          <Route path="/board/:id" element={<SingleBoard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
