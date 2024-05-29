// utils/bookmarkManager.js
const bookmarkNews = (newsItem) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push(newsItem);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

const removeBookmark = (newsId) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== newsId);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
};

export { bookmarkNews, removeBookmark };