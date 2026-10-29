import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router";
import { ModalContext } from "../context/ModalContext";
import { queryClient } from "../main";
import { deleteBook } from "../services/bookApiService";
function BookCard({ book }) {
  const { handleModal, handleEdit } = useContext(ModalContext);

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return (
    <div key={book.id}>
      <h1>{book.title}</h1>
      <Link
        to={`/books/${book.id}`}
        title="see book details"
        className="cursor-pointer"
      >
        <div>
          <img src={book.coverImage} alt={book.title} />
        </div>
      </Link>
      <span>{book.author}</span>
      <span>{book.price}</span>

      <div className="flex justify-between">
        <button
          className="bg-blue-300 rounded-md px-6 py-2 cursor-pointer"
          onClick={() => {
            handleModal();
            handleEdit(book);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 rounded-md px-6 py-2 cursor-pointer"
          onClick={() => mutation.mutate(book.id)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
