import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SnackFormType } from '../types/snackType';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import convertStringToArray from '../utils/convertStringToArray';
import { useQuery } from '@tanstack/react-query';
import fetchSingleSnackId from '../fetcher/fetchSingleSnackId';

const Update: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [formError, setFormError] = useState<string | null>('');

  const [snack, setSnack] = useState<SnackFormType>({
    title: '',
    description: '',
    rating: 0,
    price: 0,
    locationsAvailableAt: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check we have valid values
    if (!snack.title || !snack.description || !snack.rating || !snack.price) {
      setFormError('Please fill out all fields');
      return;
    }

    // send request to update snack in database
    const { error } = await supabase
      .from('snacks')
      .update({ ...snack })
      .eq('id', id) // only update the snack with the id that matches the id in the url
      .select();

    if (error) {
      setFormError(error.message);
      return;
    }

    // redirect to home page if no errors
    setFormError(null);
    navigate('/');
  };

  // use react-query to fetch the data
  const { isError, isLoading } = useQuery(['fetchSingleSnackId', id], () => fetchSingleSnackId(id), {
    onSuccess: (data) => {
      setSnack({
        title: data.title,
        description: data.description,
        rating: data.rating,
        price: data.price,
        locationsAvailableAt: data.locationsAvailableAt,
      });
    },
    onError: (error) => {
      console.log(error);
      navigate('/', { replace: true }); // redirect to home page and replace the current page in the history
    },
  });

  if (isLoading) {
    return (
      <div className="page update">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page update">
        <h2>Error loading the snack</h2>
        <p>Sorry 😢</p>
      </div>
    );
  }

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={snack.title}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSnack({
              ...snack,
              title: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="description">description:</label>
        <textarea
          id="description"
          value={snack.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSnack({
              ...snack,
              description: e.currentTarget.value,
            })
          }
          placeholder="A description of the snack"
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={snack.rating}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSnack({
              ...snack,
              rating: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={snack.price}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSnack({
              ...snack,
              price: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="locationsAvailableAt">Available At:</label>
        <input
          type="text"
          id="locationsAvailableAt"
          value={snack.locationsAvailableAt}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSnack({
              ...snack,
              locationsAvailableAt: convertStringToArray(e.currentTarget.value),
            })
          }
          placeholder="Comma separated values"
        />

        <button>Update Snack</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
