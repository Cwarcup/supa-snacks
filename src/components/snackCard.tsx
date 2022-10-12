import React from 'react';
import { SnackType } from '../types/snackType';

interface SnackCardProps {
  snack: SnackType;
}

const snackCard = ({ snack }: SnackCardProps): JSX.Element => {
  return (
    <div className="snack-card">
      <h3>{snack.title}</h3>
      <p>{snack.description}</p>
      <div className="rating">{snack.rating}</div>
      <div className="rating">
        {(snack.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'CAD' })}
      </div>
    </div>
  );
};

export default snackCard;
