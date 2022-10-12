import React, { useState, useEffect } from 'react';
import { SnackType } from '../types/snackType';
import supabase from '../config/supabaseClient';

const Home: React.FC = () => {
  const [snacks, setSnacks] = useState<SnackType[] | null>(null);

  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    // fetch data from supabase once
    const fetchSnacks = async () => {
      const { data, error } = await supabase
        .from('snacks') // table name
        .select(); // select all columns

      if (error) {
        console.log("Couldn't fetch snacks");
        setFetchError(error.message);
        setSnacks(null);
      }

      if (data) {
        setSnacks(data);
        setFetchError(null);
      }
    };

    fetchSnacks(); // call the function to try to fetch data
  }, []);

  return (
    <div className="page home">
      {fetchError && <p className="error">{fetchError}</p>}
      {snacks && (
        <div className="snacks">
          {snacks.map((snack, index) => (
            <p key={index}>{snack.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
