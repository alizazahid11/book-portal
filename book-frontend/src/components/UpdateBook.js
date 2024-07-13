import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const [authname, setAuthname] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookDetails();
  }, []);

  const getBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8001/book/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      setAuthname(data.authname);
      setTitle(data.title);
      setUrl(data.url);
      setCategory(data.category);
    } catch (error) {
      console.error('Error fetching book details:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const updateBook = async () => {
    try {
      const response = await fetch(`http://localhost:8001/book/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ authname, title, category, url }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      // Book updated successfully, navigate back to BookList
      navigate('/book');
    } catch (error) {
      console.error('Error updating book:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className='add-book'>
      <h1>Update Book</h1>
      <input type="text" placeholder="Enter Book name" className='inputBox' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Enter Author name" className='inputBox' value={authname} onChange={(e) => setAuthname(e.target.value)} />
      <input type="text" placeholder="Enter category" className='inputBox' value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="text" placeholder="Enter URL" className='inputBox' value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={updateBook} className='appButton'>Update Book</button>
    </div>
  );
};

export default UpdateBook;
