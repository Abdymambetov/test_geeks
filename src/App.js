import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/Theme';
import MainPage from './pages/mainPage/MainPage';
import MangaInfoPage from './pages/mangaInfoPage/MangaInfoPage';
import Layouts from './layouts/Layouts';
function App() {
  return (
    <div className='App'>
      <div className='container'>
        <ThemeProvider theme={theme}>
              <Routes>
                <Route path='/' element={<Layouts/>}>
                  <Route index element={<MainPage/>}/>
                  <Route path='/:id' element={<MangaInfoPage/>}/>
                </Route>
              </Routes>
          </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
