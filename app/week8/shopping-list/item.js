import React from 'react';

export default function Item({ name, quantity, category, onSelect }) {
  const handleClick = () => {
    onSelect && onSelect({ name, quantity, category });
  };

  return (
    <li className="bg-white text-black border rounded-lg p-2 mb-3 shadow-md"
      onClick={handleClick}
    >
      <strong className="font-bold">{name}</strong>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </li>
  );
}
