import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [buyLink, setBuyLink] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: itemName,
      category,
      buyLink,
    };
    setItems([...items, newItem]);
    setItemName("");
    setCategory("");
    setBuyLink("");
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);

  const uniqueCategories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="container">
      <h1>Wishlist Wizard</h1>

      <form onSubmit={handleAddItem} className="form">
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Buy Link (optional)"
          value={buyLink}
          onChange={(e) => setBuyLink(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {items.length > 0 && (
        <div className="filter">
          <label>Filter by Category:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="card">
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
            <h3>{item.name}</h3>
            <p className="category">{item.category}</p>
            {item.buyLink && (
              <a
                href={item.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="buy-button"
              >
                🛒 Buy Now
              </a>
            )}
            <button className="remove-button" onClick={() => handleRemove(item.id)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
