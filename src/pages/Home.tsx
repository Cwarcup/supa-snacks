import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
  // store the snacks
  const [snacks, setSnacks] = useState(null);
  // error message
  const [fetchError, setFetchError] = useState(null);
  return (
    <div className="page home">
      <h2>Home</h2>
      <p>Here are some snacks:</p>
    </div>
  );
};

export default Home;
