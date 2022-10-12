import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';

// pages
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Snacks</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Snack</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
