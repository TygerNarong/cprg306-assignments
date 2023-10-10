"use client";
import {useState} from "react";

export default function NewItem(){

    const [name, setName] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [category, setCategory] = useState("Produce");

    const handleSubmit = (event) => {
        event.preventDefault();
        const newItem = {name, quantity, category};
        console.log(newItem);
        alert('Name: ' + name + '\nQuantity: ' + quantity + '\nCategory: ' + category);
        setName("");
        setQuantity(1);
        setCategory("Produce");
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

return (
    <div className="bg-slate-300 rounded-lg p-4 shadow-md space-y-3">
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="block font-semibold text-black">Name</label>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        required
        className="w-full border rounded-lg p-2 shadow-md text-black"
      />
    </div>
    <div className="mb-3">
      <label className="block font-semibold text-black">Quantity</label>
      <input
        type="number"
        min="1"
        max="99"
        value={quantity}
        onChange={handleQuantityChange}
        required
        className="w-full border rounded-lg p-2 shadow-md text-black"
      />
    </div>
    <div className="mb-3">
      <label className="block font-semibold text-black">Category</label>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="w-full border rounded-lg p-2 shadow-md text-black"
      >
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
        <option value="Meat">Meat</option>
        <option value="Frozen Foods">Frozen Foods</option>
        <option value="Canned Goods">Canned Goods</option>
        <option value="Dry Goods">Dry Goods</option>
        <option value="Beverages">Beverages</option>
        <option value="Snacks">Snacks</option>
        <option value="Household">Household</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-green-700 active:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Add Item
    </button>
  </form>
  </div>
);

};