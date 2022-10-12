import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SnackFormType } from '../types/snackType';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import convertStringToArray from '../utils/convertStringToArray';

const Update: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  // used to pre-populate the form with the snack's current values
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number | string>(0);
  const [price, setPrice] = useState<number | string>(0);
  const [locationsAvailableAt, setLocationsAvailableAt] = useState<string[] | string>([]);

  useEffect(() => {
    const fetchSnack = async () => {
      // use supabase to fetch the data
      const { data, error } = await supabase
        .from('snacks') // table
        .select() // select all columns
        .eq('id', id) // where id = id
        .single(); // only return one row

      if (error) {
        console.log(error);
        navigate('/', { replace: true }); // redirect to home page and replace the current page in the history
      }

      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setRating(data.rating);
        setPrice(data.price);
        setLocationsAvailableAt(data.locationsAvailableAt);
      }
    };

    // invoke the function
    fetchSnack();
  }, [id, navigate]);

  return (
    <div className="page update">
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
        />
        <label htmlFor="description">description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
          placeholder="A description of the snack"
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setRating(e.currentTarget.value)}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setPrice(e.currentTarget.value)}
        />
        <label htmlFor="locationsAvailableAt">Available At:</label>
        <input
          type="text"
          id="locationsAvailableAt"
          value={locationsAvailableAt}
          onChange={(e) => setLocationsAvailableAt(convertStringToArray(e.currentTarget.value))}
          placeholder="Comma separated values"
        />

        <button>Update Snack</button>
      </form>
    </div>
  );
};

export default Update;
