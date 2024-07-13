import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Addbook = () => {
  
  const [title, setTitle] = useState("");
  const [authname, setAuthname] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);

  const addbook = async () => {
    // Check if required fields are not empty
    if (!authname || !title || !url || !category ) {
      setError(true);
      return;
    }

    // Make API request to add book
    try {
      const result = await fetch("http://localhost:8001/add-book", {
        method: 'post',
        body: JSON.stringify({ authname,title,category,url }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.ok) {
        // book added successfully, reset form fields
        setAuthname("");
        setTitle("");
        setCategory("");
        setUrl("");
        // book added successfully, handle success if needed
        console.log('Book added successfully');
      } else {
        // Handle error response from the server
        console.error('Error adding Book:', result.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error adding project:', error.message);
    }
  };

  return (
    <div className='add-book'>
      <h1>Add Book</h1>
      <input type="text" placeholder="Enter Book name" className='inputBox' value={title} onChange={(e) => setTitle(e.target.value)} />
      {error && !title && <span className="invalid-input">Enter Title</span>}
      <input type="text" placeholder="Enter Author name" className='inputBox' value={authname} onChange={(e) => setAuthname(e.target.value)} />
      {error && !authname && <span className="invalid-input">Enter Author name</span>}
      <input type="text" placeholder="Enter Category" className='inputBox' value={category} onChange={(e) => setCategory(e.target.value)} />
      {error && !category && <span className="invalid-input">Enter Category</span>}
      <input type="text" placeholder="Enter Url" className='inputBox' value={url} onChange={(e) => setUrl(e.target.value)} />
      {error && !url && <span className="invalid-input">Enter Url</span>}
      <button onClick={addbook} className='appButton'>Submit Book</button>
    </div>
  );
};

export default Addbook;