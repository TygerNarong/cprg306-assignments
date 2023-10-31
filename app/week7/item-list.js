"use client";
import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
  });

  const handleSortByName = () => {
    setSortBy("name");
  };

  const handleSortByCategory = () => {
    setSortBy("category");
  };

  return (
    <div>
      <div>
        <button
          onClick={handleSortByName}
          className="btn btn-primary"
        >
          Sort by Name
        </button>
        <button
          onClick={handleSortByCategory}
          className="btn btn-primary"
        >
          Sort by Category
        </button>
      </div>
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            {...item}
            onSelect={() => onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}