import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Nav from './components/Navbar';
import Footer from './components/footer';
import Addbook from './components/Addbook';
import BookList from './components/BookList';
import UpdateBook from './components/UpdateBook';
import AboutUsPage from './components/AboutUsPage';
import Review from './components/Review';
function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Routes>
   
          <Route path="/book" element={<BookList/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<Addbook />} />
          <Route path="/update/:id"  element={<UpdateBook/>}/>
          <Route path="/aboutus"  element={<AboutUsPage/>}/>
          <Route path="/review"  element={<Review/>}/>
        </Routes>
        
      </div>
   
    </Router>
    
  );
}

export default App;
