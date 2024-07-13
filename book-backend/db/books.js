const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
    title:{ type: String, required: true },
    authname:{ type: String, required: true },
    url:{ type: String, required: true },
    category:{ type: String, required: true },
    userId:{ type: String },
    
    
})
module.exports=mongoose.model("books",bookSchema);