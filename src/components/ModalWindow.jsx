import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Field from "../components/Field";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import { ModalContext } from "../context/ModalContext";
import { queryClient } from "../main";
import { createBook, updateBook } from "../services/bookApiService";
function ModalWindow() {
  const { handleModal, editBook } = useContext(ModalContext);
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editBook) {
      reset(editBook);
    } else {
      reset();
    }
  }, [editBook, reset]);

  const mutaion = useMutation({
    mutationFn: (bookInfo) => {
      return editBook
        ? updateBook(editBook.id, bookInfo)
        : createBook(bookInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigation("/books");
      reset();
    },
  });

  const handleCreateBook = async (data) => {
    let bookTitle;
    bookTitle = data.title;

    const formatImageUrl = `https://placehold.co/300x400?text=${bookTitle.split(" ").join("+")}`;

    const bookInfo = { ...data, coverImage: formatImageUrl };

    mutaion.mutate(bookInfo);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/10 p-4 backdrop-blur-[4px]">
      <div className="h-dvh w-full  overflow-y-auto rounded-xl bg-black-400/20 bg-blue-300/20  p-6 shadow-xl transition-all duration-500">
        <Form onSubmit={handleSubmit(handleCreateBook)}>
          <div className="relative">
            <button
              className="text-2xl absolute top-0 right-0 cursor-pointer"
              type="button"
              onClick={handleModal}
            >
              x
            </button>
          </div>
          <Fieldset title={"Create Your Dream Book"}>
            <Field label={"Title"} error={errors.title}>
              <input
                type="text"
                placeholder="Enter your book title"
                name="title"
                id="title"
                {...register("title", {
                  required: "Title is required",
                  setValueAs: (value) => value.trim(),
                })}
                autoComplete="title"
              />
            </Field>
            <Field label={"Author"} error={errors.author}>
              <input
                type="text"
                placeholder="Enter author name"
                name="author"
                id="author"
                {...register("author", { required: "Author is required" })}
                autoComplete="author"
              />
            </Field>
            <Field label={"Genre"} error={errors.genre}>
              <input
                type="text"
                placeholder="Enter Book Genre"
                id="genre"
                name="genre"
                {...register("genre", { required: "Genre is required" })}
                autoComplete="genre"
              />
            </Field>
            <Field label={"Price"} error={errors.price}>
              <input
                type="number"
                placeholder="Enter book price"
                name="price"
                id="price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: 1,
                })}
                autoComplete="price"
              />
            </Field>
            <Field label={"PublishedYear"} error={errors.publishedYear}>
              <input
                type="text"
                placeholder="Enter Book Published Year"
                name="publishedYear"
                id="publishedYear"
                {...register("publishedYear", { required: "Year is required" })}
                autoComplete="publishedYear"
              />
            </Field>
            <Field label={"Description"} error={errors.description}>
              <textarea
                placeholder="Enter Book description"
                name="description"
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                autoComplete="description"
              />
            </Field>
            <Field label={"CoverImage"} error={errors.coverImage}>
              <input
                type="text"
                placeholder="Enter Image url"
                name="coverImage"
                id="coverImage"
                {...register("coverImage", { required: "Image is required" })}
                autoComplete="coverImage"
              />
            </Field>
            <Field label={"Rating"} error={errors.rating}>
              <input
                type="number"
                placeholder="Enter Book Rating"
                name="rating"
                id="rating"
                {...register("rating", {
                  required: "Rating is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Rating must be at least 1" },
                  max: { value: 5, message: "Rating must be at most 5" },
                })}
                autoComplete="rating"
              />
            </Field>
            <SubmitButton />
          </Fieldset>
        </Form>
      </div>
    </div>
  );
}

export default ModalWindow;
