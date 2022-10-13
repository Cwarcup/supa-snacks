import React, { useState, useEffect } from 'react';
import { SnackType } from '../types/snackType';
import supabase from '../config/supabaseClient';
import { useQuery, useMutation } from '@tanstack/react-query';

// components
import SnackCard from '../components/snackCard';

const Home: React.FC = () => {
  // const [snacks, setSnacks] = useState<SnackType[] | null>(null);

  // const [fetchError, setFetchError] = useState<string | null>(null);

  // useEffect(() => {
  //   // fetch data from supabase once
  //   const fetchSnacks = async () => {
  //     const { data, error } = await supabase
  //       .from('snacks') // table name
  //       .select(); // select all columns

  //     if (error) {
  //       console.log("Couldn't fetch snacks");
  //       setFetchError(error.message);
  //       setSnacks(null);
  //     }

  //     if (data) {
  //       setSnacks(data);
  //       setFetchError(null);
  //     }
  //   };

  //   fetchSnacks(); // call the function to try to fetch data
  // }, []);

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
          {/* order by buttons */}
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
