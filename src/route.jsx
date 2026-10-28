import { createBrowserRouter } from "react-router";
import BookDetails from "./components/BookDetails";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      { path: "books", Component: Books },
      { path: "login", Component: Login },
      { path: "books/:bookId", Component: BookDetails },
      { path: "register", Component: Register },
      { path: "reset", Component: Reset },
      { path: "*", Component: NotFound },
    ],
  },
]);
