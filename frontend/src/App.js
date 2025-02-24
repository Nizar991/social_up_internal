import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import StaticImagePageAynaghor from './pages/StaticImagePageAynaghor';
import StaticImagePagePinx from './pages/StaticImagePagePinx';
import StaticImagePageAce from './pages/StaticImagePageAce';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/static-images-aynaghor" element={<StaticImagePageAynaghor />} />
          <Route path="/static-images-pinx" element={<StaticImagePagePinx />} />
          <Route path="/static-images-ace" element={<StaticImagePageAce />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
