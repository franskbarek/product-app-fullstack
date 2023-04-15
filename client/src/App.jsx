import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddProduct, EditProduct, Home, Login, Register, UserProfile } from "./pages";
import { Navbar } from "./components";
import { useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="p-2">
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
