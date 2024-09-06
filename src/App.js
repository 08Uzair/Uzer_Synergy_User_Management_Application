import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Navbars from "./component/Navbar";
import Home from "./component/Home";
import Table from "./component/Table";
const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbars />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
