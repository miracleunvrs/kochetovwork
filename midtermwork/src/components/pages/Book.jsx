import React, { useEffect, useMemo, useState, useCallback } from "react";
import BookCard from "../BookCard";

const STORAGE_KEY = "mini_library_books";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setBooks(parsed);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const handleDelete = useCallback((id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setBooks([]);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books
      .filter((b) => (genre === "all" ? true : b.genre === genre))
      .filter((b) => (q ? b.title.toLowerCase().includes(q) : true));
  }, [books, query, genre]);

  return (
    <div>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Nonfiction</option>
          <option value="tech">Tech</option>
        </select>
        <button type="button" className="secondary" onClick={handleReset}>Reset</button>
      </div>

      {filtered.length === 0 ? (
        <div className="muted">No books found.</div>
      ) : (
        <div className="grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Books;
