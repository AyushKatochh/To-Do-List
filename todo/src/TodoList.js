import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
      });
      setItemName('');
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="wrapper">
      <h2>To Do List</h2>
      <p></p>
      <ul className="plates">
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <form className="add-items" onSubmit={addItem}>
        <input
          type="text"
          name="item"
          placeholder="Item Name"
          required
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input type="submit" value="+ Add Item" />
      </form>
    </div>
  );
};

export default TodoList;
