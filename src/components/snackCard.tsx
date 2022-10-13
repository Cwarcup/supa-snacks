import React from 'react';
import { SnackType } from '../types/snackType';
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';

interface SnackCardProps {
  snack: SnackType;
}

const SnackCard: React.FC<SnackCardProps> = ({ snack }) => {
  // handle when user clicks the delete icon
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('snacks')
      .delete()
      .eq('id', snack.id) // where id = snack.id
      .select();

    if (error) {
      console.log(error);
    }

    console.log(data);
  };

  

  return (
    <div className="snack-card">
      <h3>{snack.title}</h3>
      <p>{snack.description}</p>
      <div className="rating">{snack.rating}/10</div>
      <div className="price">{(snack.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'CAD' })}</div>
      <div className="buttons">
        <Link to={`/update/${snack.id}`}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SnackCard;
