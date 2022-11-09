const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
   message : {type: String,required:true},
   number : {type: Number,required:true},
   
    
},{timestamps:true});
mongoose.models={}

export default mongoose.model("Feed",FeedSchema);