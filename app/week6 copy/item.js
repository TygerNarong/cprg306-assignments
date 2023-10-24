import React from "react";

export default function Item({name, quantity, category}) {
    return (
        <li className="bg-white text-black border rounded-lg p-2 mb-3 shadow-md">
            <strong className="text-l">{name}</strong>
            <p className="text-black">Quantity: {quantity}</p>
            <p className="text-black">Category {category}</p>
        </li>
    );
}
