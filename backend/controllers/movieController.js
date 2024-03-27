import Movie from "../models/Movies.js";
import path from "path";


export const createMovie = async(req, res) =>{
    try{
        const filename = req.file.filename
        const fileUrl = path.join(filename)

        const movie = new Movie(req.body);

        movie.image = fileUrl

        const savedMovie = await movie.save();
        
        return res.status(200).json({
            success: true,
            message: "Movie created successfully",
            savedMovie
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating movie",
        });
    }
}


export const getAllMovies = async(req, res) =>{
    try{
        const movies = await Movie.find();

        return res.status(200).json({
            success: true,
            movies
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting all movies",
        });
    }
}


export const getSpecificMovie = async(req, res) =>{
    try{
        const {id} = req.params;

        const movie = await Movie.findById(id);

        return res.status(200).json({
            success: true,
            movie
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting specific movie",
        });
    }
}

export const UpdateMovie = async(req, res) =>{
    try{
        const {id} = req.params;

        console.log("id", id);

        const filename = req.file.filename
        const fileUrl = path.join(filename)

        console.log("fileUrl", fileUrl);

        console.log("req.body", req.body);

        const updated = await Movie.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                year: req.body.year,
                detail: req.body.detail,
                cast: req.body.cast,
                image: fileUrl
            }
        },{new: true});

        console.log("updated", updated);

        return res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            updated
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating movie",
        });
    }
}


export const movieReview = async(req, res) =>{
    try{
        const {rating,comment} = req.body;

        const movie = await Movie.findById(req.params.id);
        console.log("movie", movie)
        if(movie)
        {
            const alreadyReviewed = movie.reviews.find( (r) => 
                r.user.toString() === req.user.id.toString()
            );

            if(alreadyReviewed)
            {
                return res.status(400).json({
                    success: false,
                    message: "Movie already reviewed by you",
                })
            }

            console.log("alreadyReviewed", alreadyReviewed);
            console.log("rating", rating);
            console.log("comment", comment);
            console.log("req.user", req.user);
            console.log("name", req.user.name);
            const review = {
                user: req.user._id,
                name: req.user.username,
                rating: Number(rating),
                comment,
            }

            movie.reviews.push(review);

            movie.numReviews = movie.reviews.length;

            movie.rating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

            await movie.save();

            return res.status(200).json({
                success: true,
                message: "Movie reviewed successfully",
                movie
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while review movie",
        });
    }
}

export const getMovieReviews = async(req, res) =>{
    try{
        const {id} = req.params;
        const movie = await Movie.findById(id);

        if(!movie)
        {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            })
        }

        const reviews= movie.reviews


        return res.status(200).json({
            success: true,
            reviews
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting movie reviews",
        });
    }
} 

export const deleteMovie = async(req, res) =>{
    try{
        const {id} = req.params;

        const deleted = await Movie.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
            deleted
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting movie",
        });
    }
}


export const deleteComment = async(req, res) =>{
    try{
        const {movieId,reviewId} = req.body;
       
        const movie = await Movie.findById(movieId);

        if(!movie)
        {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            })
        }

        const reviewIndex = movie.reviews.findIndex((r) => r._id.toString() === reviewId);

        if(reviewIndex === -1)
        {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            })
        }

        movie.reviews.splice(reviewIndex,1);

        movie.numReviews = movie.reviews.length;

        movie.rating = movie.reviews.length > 0 
            ? 
                movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length 
            :   0

        await movie.save();

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            movie
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting comment",
        });
    }
}


export const getNewMovies = async(req, res) =>{
    try{
        const newMovies = await Movie.find().sort({createdAt: -1}).limit(8);

        return res.status(200).json({
            success: true,
            newMovies
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting new movies",
        });
    }
}

export const getTopMovies = async(req, res) =>{
    try{
        const topMovies = await Movie.find().sort({numReviews: -1}).limit(8);
        return res.status(200).json({
            success: true,
            topMovies
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting top movies",
        });
    }
    
}


export const getRandomMovies = async(req, res) =>{
    try{
        const randomMovies = await Movie.aggregate([
            {$sample: {size: 5}},
        ]);


        return res.status(200).json({
            success: true,
            randomMovies
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting random movies",
        });
    }
}
