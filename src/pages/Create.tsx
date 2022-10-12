import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const Create: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);

  // fired when user clicks submit button
  // needs to create a new item in the snacks table
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh

    // check if all fields are filled out
    if (!title || !description || !rating || !price) {
      setFormError('Please fill out all fields');
      return;
    }

    // check if rating is between 1 and 10
    if (rating < 1 || rating > 10) {
      setFormError('Rating must be between 1 and 10');
      return;
    }

    // check if price is a positive number
    if (price < 0) {
      setFormError('Price must be a positive number');
      return;
    }

    // send data to supabase
    // data is the new item that was created - if successful
    // error is the error message - if unsuccessful
    const { data, error } = await supabase
      .from('snacks') // table name
      .insert([{ title, description, rating, price }]) // insert a new row, is represented as an array of objects
      .select(); 
			
    if (error) {
      console.log(error);
      setFormError('Please fill in all the fields correctly.');
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate('/');
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />

        <label htmlFor="rating">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />

        <button>Create New Snack</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
