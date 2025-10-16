import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Books from "./pages/Books.jsx";
import AddSBook from "./pages/AddSBook.jsx";
const STORAGE_KEY = "mini_library_books";

const App = () => {
  const [books, setBooks] = useState([]);


  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setBooks(parsed);
      }
    } catch {

    }
  }, []);


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const handleAddBook = useCallback((partialBook) => {
    const newBook = {
      id: Date.now(),
      title: partialBook.title.trim(),
      author: partialBook.author.trim(),
      genre: partialBook.genre,
      rating: Number(partialBook.rating),
    };
    setBooks(prev => [...prev, newBook]);
  }, []);

  const handleDelete = useCallback((id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  }, []);

  return (
    <BrowserRouter>
      <header className="header">
        <nav className="nav">
          <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>Books</NavLink>
          <NavLink to="/add-book" className={({ isActive }) => (isActive ? "active" : "")}>Add Book</NavLink>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<Books books={books} onDelete={handleDelete} />} />
          <Route path="/add-book" element={<AddSBook onAdd={handleAddBook} />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;


