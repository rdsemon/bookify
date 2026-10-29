import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBook } from "../services/bookApiService";
function BookDetails() {
  const params = useParams();
  const { bookId } = params;

  console.log(bookId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", bookId],
    queryFn: () => getBook(bookId),
  });

  const book = data;

  if (isLoading) return <p>Loading.....</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex  px-10 py-8 justify-center gap-4">
      <div>
        <img src={book.coverImage} alt={book.title} />
      </div>
      <div className="self-center">
        <h3>{book.title}</h3>
        <h4>{book.author}</h4>
        <span>{book.genre}</span>
        <p>{book.description}</p>
        <div className="flex justify-between">
          <span>{book.price}</span>
          <span>{book.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
