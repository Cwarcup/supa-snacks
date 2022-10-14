import React from 'react';
import { SnackType } from '../types/snackType';
import { Link } from 'react-router-dom';

interface SnackCardProps {
  snack: SnackType;
}

const SnackCard: React.FC<SnackCardProps> = ({ snack }) => {

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
      </div>
    </div>
  );
};

export default SnackCard;
