import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/BookCard";
import { getBooks } from "../services/bookApiService";

function Books() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  if (isLoading) return <p>Loading.......</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="flex flex-wrap justify-center items-center gap-6">
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default Books;
