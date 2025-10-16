import React, { useMemo, useState, useCallback } from "react";
import BookCard from "../components/BookCard.jsx";

const Books = ({ books, onDelete }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");

  const handleDelete = useCallback((id) => {
    onDelete(id);
  }, [onDelete]);

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


