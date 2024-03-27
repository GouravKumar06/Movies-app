import express from "express";
import { authenticated, isAdmin } from "../middlewares/auth.js";
import { UpdateMovie, createMovie, deleteComment, deleteMovie, getAllMovies, getMovieReviews, getNewMovies, getRandomMovies, getSpecificMovie, getTopMovies, movieReview } from "../controllers/movieController.js";
import checkId from "../middlewares/checkId.js";
import  upload  from "../multer.js";
const router = express.Router();

router.post("/create-movie",authenticated,isAdmin,upload.single("image"),createMovie)
router.get("/get-all-movies",getAllMovies);
router.get("/get-speficic-movie/:id",getSpecificMovie);
router.put("/update-movie/:id",upload.single("image"),UpdateMovie);
router.delete("/delete-movie/:id",authenticated,isAdmin,deleteMovie);

router.post("/get-all-movies/:id/reviews",authenticated,checkId,movieReview);
router.get("/get-all-reviews/:id",getMovieReviews);
router.post("/delete-comment",deleteComment)
router.get("/get-new-movies",getNewMovies);
router.get("/get-top-movies",getTopMovies);
router.get("/get-random-movies",getRandomMovies);


export default router
