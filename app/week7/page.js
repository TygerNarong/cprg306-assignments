"use client";
import Link from 'next/link';
import { useState } from 'react'; 
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import itemData from './items.json';

export default function Page() {
  const [selectedItemName, setSelectedItemName] = useState(""); 
  const [items, setItems] = useState(itemData); 
  const [numberOfMeals, setNumberOfMeals] = useState(0);

  const handleItemSelect = (selectedItem) => {
    const cleanedItemName = selectedItem.name.split(",")[0].replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uD000-\uDFFF]|\uD83D[\uDC00-\uDE4F]|�[�-�]|�[�-�]|[\u2011-\u26FF]|�[�-�])/g, '').trim();

    setSelectedItemName(cleanedItemName);
  };
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
};

  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <div>
        <h1 className="text-black text-3xl font-bold mb-4">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <MealIdeas ingredient={selectedItemName} updateNumberOfMeals={setNumberOfMeals} />
    </main>
  );
}
