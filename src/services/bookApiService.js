import { bookApi } from "./axios";

export const getBooks = async () => {
  try {
    const response = await bookApi.get("/books");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
