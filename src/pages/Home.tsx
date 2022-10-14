import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useQuery } from '@tanstack/react-query';

// components
import SnackCard from '../components/snackCard';

const Home: React.FC = () => {
  // used to change the order of the snacks
  const [orderBy, setOrderBy] = useState('created_at');

  // fetch snacks query from supabase
  const supabaseQuery = async () => {
    const { data, error } = await supabase.from('snacks').select().order(orderBy, { ascending: true });
    if (error) throw error;
    return data;
  };

  //react-query to fetch data
  const { data: snacks, isLoading, isError, refetch } = useQuery(['fetchAllSnacks'], supabaseQuery);

  const handleClick = (cb: any) => {
    setOrderBy(cb);
    refetch();
  };

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
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => handleClick('created_at')}>Time Created</button>
            <button onClick={() => handleClick('title')}>Title</button>
            <button onClick={() => handleClick('rating')}>Rating</button>
            <button onClick={() => handleClick('price')}>Price</button>
            {orderBy}
          </div>
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
