const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const User = require('./db/users');
const Book=require('./db/books')
const app = express();
const Review = require('./db/Review');
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

connectDB();
app.use(cors(corsOptions));

// User signup
app.post('/signup', async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.status(201).json(result);
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ result: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ result: 'No user found with the provided email' });
    }

    if (password !== user.password) {
      return res.status(401).json({ result: 'Incorrect password' });
    }

    res.status(200).json({ result: 'Login successful', user: { email: user.email } });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ result: 'Internal server error' });
  }
});
//for add book
app.post("/add-book" ,async(req,resp)=>{
  let book = new Book(req.body);
  let result=await book.save();
  resp.send(result)
})
//book-list
app.get("/books",async(req,res)=>{
  const books=await Book.find();
  if(books.length>0){
      res.send(books)
  }
  else{
      res.send({result:"no product found"})
  }
})
//delete book
app.delete("/book/:id",async(req,res)=>{
  let result=await Book.deleteOne({_id:req.params.id})
  res.send(result)
})
//getting data from update table 
app.get("/book/:id",async(req,res)=>{
  let result=await Book.findOne({_id:req.params.id})
  if(result){
      res.send(result)
  }else{
    res.send({"result":"no product found"})
  }
})
//update method 
app.put("/book/:id",async(req,res)=>{
  let result=await Book.updateOne(
      {_id:req.params.id},
      {$set:req.body}
  )
  res.send(result)
  
  })

// for search fetching data
app.get("/search/:key", async (req, res) => {
  try {
      const searchKey = req.params.key; // Capture the key parameter from the request
      const result = await Book.find({
          "$or": [
              { "title": { $regex: new RegExp(searchKey, 'i') } },
              { "authname": { $regex: new RegExp(searchKey, 'i') } }
          ]
      });
      
      if (result.length > 0) {
          res.send(result);
      } else {
          res.send({ result: "no product found" });
      }
  } catch (error) {
      console.error('Error during search:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Endpoint to add a review
app.post('/add-review', async (req, res) => {
  try {
    const { username, reviewText } = req.body;
    const review = new Review({ username, reviewText });
    const result = await review.save();
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Sort by most recent
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(8001, () => {
  console.log('Server is running on http://localhost:5001');
});