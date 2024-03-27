import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    user:{
        type:Object,
        required:true,
        ref:"User"
    }
},{timestamps:true})

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    year:{
        type:Number,
        required:true
    },
    genre:{
        type:Object,
        required:true,
        ref:"Genre"
    },
    detail:{
        type:String,
        required:true
    },
    cast:[{type:String}],
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})


const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

