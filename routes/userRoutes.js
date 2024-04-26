import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

//Public route
router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getOneUser);

router.post("/", UserController.addUser);

router.patch("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export default router;
