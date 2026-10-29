import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router";
import { ModalContext } from "../context/ModalContext";
import { auth, logout } from "../superbase";

function Navigation() {
  const [currentUser] = useAuthState(auth);
  const { handleModal } = useContext(ModalContext);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log("Logout fail", err.message);
    }
  };
  return (
    <nav className="w-full flex justify-center items-center mb-10 px-6 py-4">
      <ul className="flex justify-between w-1/2">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/books"}>Books</NavLink>
        </li>
        <li>
          {currentUser ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
        </li>
        <li>
          <NavLink to={"/register"}>Register</NavLink>
        </li>
        <li>
          <button
            className="uppercase cursor-pointer border border-amber-50 px-4 rounded-md py-2"
            onClick={handleModal}
          >
            Create Book
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
