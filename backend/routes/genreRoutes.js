import express from "express";
import { authenticated, isAdmin } from "../middlewares/auth.js";
import { createGenre, deleteGenre, getAllGenres, getGenre, updateGenre } from "../controllers/genreController.js";
const router = express.Router();

router.post("/create-genre",authenticated,isAdmin,createGenre);
router.post("/update-genre/:id",authenticated,isAdmin,updateGenre);
router.delete("/delete-genre/:id",authenticated,isAdmin,deleteGenre);
router.get("/get-all-genres",authenticated,isAdmin,getAllGenres);
router.get("/get-genre/:id",authenticated,isAdmin,getGenre);


export default router;