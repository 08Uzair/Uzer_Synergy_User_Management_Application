import React from "react";
import { NavLink } from "react-router-dom";

function NavList() {
  return <></>;
}

function Navbars() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="containerNav backCss">
      <nav className="mx-auto max-w-screen-xl px-6 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <NavLink
            to="/"
            className="mr-4 cursor-pointer py-1.5 text-slate-800 font-semibold text-xl"
          >
            Uzer.
          </NavLink>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <button
            className="ml-auto h-6 w-6 text-inherit lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        {openNav && (
          <div className="lg:hidden">
            <NavList />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbars;
