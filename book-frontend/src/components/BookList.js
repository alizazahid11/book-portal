import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8001/books');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/book/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      alert('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  const searchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:8001/search/${searchKey}`);
      if (!response.ok) {
        throw new Error('Failed to search books');
      }
      const result = await response.json();
      setBooks(result);
    } catch (error) {
      console.error('Error searching books:', error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchKey(event.target.value.trim());
  };

  const handleSearchButtonClick = () => {
    if (searchKey) {
      searchBooks();
    } else {
      fetchBooks();
    }
  };

  return (
    <div className="book-list">
      <h3>Book Lists</h3>
      <div className="search-container">
        <input type="text" className="search" placeholder="Search Book" onChange={handleSearchInputChange} />
        <button className="search-button" onClick={handleSearchButtonClick}>Search</button>
      </div>
      <div className="book-cards-container">
        {books.map(book => (
          <div key={book._id} className="book-card">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">Author: {book.authname}</p>
            <p className="book-category">Category: {book.category}</p>
            <p className="book-url">
              URL: <a href={book.url} target="_blank" rel="noopener noreferrer">{book.title} download link</a>
            </p>
            <div className="button-container">
              <Link to={`/update/${book._id}`} className="btn update-btn">Update</Link>
              <button onClick={() => handleDelete(book._id)} className="btn delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
