import React from "react";

const BookCard = React.memo(function BookCard({ book, onDelete }) {
  const { id, title, author, genre, rating } = book;
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="muted">by {author}</div>
      <div className="muted">Genre: {genre}</div>
      <div className="muted">Rating: {Number(rating).toFixed(1)}</div>
      <div>
        <button className="secondary" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
});

export default BookCard;


