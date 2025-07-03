import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.png";
import { useState } from "react";

const Navbar = () => {
  const [searchVisibility, setSearchVisibility] = useState(false);

  return (
    <>
      <nav className="navbar flex items-center p-4 bg-white shadow">
        <Link to="/">
          <img src={logo} className="w-10 flex-none" alt="logo" />
        </Link>

        <div
          className={
            "relative w-full md:w-auto transition-all duration-300 " +
            (searchVisibility ? "block" : "hidden md:block")
        }
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full md:w-[300px] bg-grey p-4 pl-12 rounded-full placeholder:text-dark-grey"
            />
            <i className="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-dark-grey text-xl" />
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto bg-grey rounded-full">
          <button
            className="md:hidden text-xl p-2 flex items-center justify-center rounded-full w-12 h-12"
            onClick={() => setSearchVisibility((currVal) => !currVal)}
          >
            <i className="fi fi-rr-search" />
          </button>
        </div>

        <Link className="hidden md:flex gap-2 link">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link className="btn-dark py-2" to="/signin">SignIn</Link>
        <Link className="btn-light py-2 hidden md:block" to="/signup">SignUp</Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
