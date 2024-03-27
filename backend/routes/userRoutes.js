import express from "express";
import { createUser, getAllUser, getCurrentUser, login,updateUser } from "../controllers/userController.js";
import { authenticated, isAdmin } from "../middlewares/auth.js";
import { logout } from "../controllers/userController.js";
const router = express.Router();

router.post("/register",createUser);
router.post("/login",login);
router.post("/logout",authenticated,logout);
router.get("/get-users",authenticated,isAdmin,getAllUser);
router.get("/get-current-user",authenticated,getCurrentUser);
router.put("/update-user",authenticated,updateUser)


export default router;