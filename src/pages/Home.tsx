import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useQuery } from '@tanstack/react-query';

// components
import SnackCard from '../components/snackCard';

const Home: React.FC = () => {
  // use react-query to fetch data
  const {
    data: snacks,
    isLoading,
    isError,
  } = useQuery(['fetchAllSnacks'], async () => {
    const { data } = await supabase.from('snacks').select();
    return data;
  });

  if (isLoading) {
    return (
      <div className="page home">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page home">
        <h2>Error loading the snacks</h2>
        <p>Sorry 😢</p>
      </div>
    );
  }

  return (
    <div className="page home">
      {snacks && (
        <div className="snacks">
          <div className="snack-grid">
            {snacks.map((snack, index) => (
              <SnackCard key={index} snack={snack} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
