import React, { useState, useEffect } from 'react';



const AboutUsPage = () => {


  return (
    <div className="about-us-page">
      <h2 className='abt-hea'>About Us</h2>
      <div className="card-container">
      <div className="card">
          <h3>Add Book</h3>
          <p>Add a new book to the database with its title, author name, category, and URL. This page allows you to input essential details of a book and securely save it to the database, ensuring that all information is accurately recorded for future reference.</p>
        </div>
        <div className="card">
          <h3>Update Book</h3>
          <p>Update book details like title, author, category, and URL. Edit fields and save changes securely to the database.Modify existing book information with ease. Ensure accuracy and relevance by updating specific fields securely</p>
          
        </div>
        <div className="card">
          <h3>Delete Book</h3>
          <p>Delete a book from both the display and database using its unique identifier (ID). This ensures removing unwanted or outdated books permanently. Clicking 'Delete Book' initiates this process, ensuring data integrity and maintaining an up-to-date inventory</p>
         
        </div>
      
      </div>
    
    </div>
  );
};

export default AboutUsPage;
