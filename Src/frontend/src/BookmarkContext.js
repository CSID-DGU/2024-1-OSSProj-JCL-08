// BookmarkContext.js
import React, { createContext, useContext, useState } from 'react';

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
export const BookmarkProvider = ({ children }) => {
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  const addBookmark = (news) => {
    setBookmarkedNews((prevBookmarks) => [...prevBookmarks, news]);
  };

  const removeBookmark = (newsId) => {
    setBookmarkedNews((prevBookmarks) =>
      prevBookmarks.filter((news) => news.id !== newsId)
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedNews, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};