function BookCard({ book }) {
  return (
    <div key={book.id}>
      <h1>{book.title}</h1>
      <div>
        <img src={book.coverImage} alt={book.title} />
      </div>
      <span>{book.author}</span>
      <span>{book.price}</span>
    </div>
  );
}

export default BookCard;
