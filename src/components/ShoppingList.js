import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState(""); // New state for search text

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(searchText) {
    setSearchText(searchText);
  }

  const itemsToDisplay = items
    .filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    })
    .filter((item) => {
      if (!searchText) return true;
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });

  return (
    <div className="ShoppingList">
      <ItemForm
        onItemFormSubmit={(newItem) => {
          console.log("New item submitted:", newItem); // ✅ FIXED: no mutation
        }}
      />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
