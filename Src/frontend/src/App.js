import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./index.css";
import { Login } from "./pages/Login/Login.jsx";
import { Join } from "./pages/Join/Join.jsx";
import { Category } from "./pages/Category/Category.jsx";
import { Main } from "./pages/Main/Main.jsx";
import { Bookmark } from "./pages/Bookmark/Bookmark.jsx";
import { Politics } from "./pages/Politics/Politics.jsx";
import { Economy } from "./pages/Economy/Economy.jsx";
import { Society } from "./pages/Society/Society.jsx";
import { BookmarkProvider } from './BookmarkContext';
import { Loading } from "./pages/Loading/Loading.jsx";

const App = () => {
  return (
    <BookmarkProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/category" element={<Category />} />
      <Route path="/main" element={<Main />} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="/politics" element={<Politics />} />
      <Route path="/economy" element={<Economy />} />
      <Route path="/society" element={<Society />} />
      <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
    </BookmarkProvider>
  );
};

export default App;
