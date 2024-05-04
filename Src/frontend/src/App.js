import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./index.css";
import { Login } from "./pages/Login/Login.jsx";
import { Join } from "./pages/Join/Join.jsx";
import { Category } from "./pages/Category/Category.jsx";
import { Main } from "./pages/Main/Main.jsx";
import { Bookmark } from "./pages/Bookmark/Bookmark.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/category" element={<Category />} />
      <Route path="/main" element={<Main />} />
      <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
