import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// pages
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';

const queryClient = new QueryClient();



const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav>
          <h1>Supa Snacks</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create New Snack</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
