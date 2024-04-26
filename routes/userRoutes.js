import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

//Public route
router.post("/adduser", UserController.addUser);
router.get("/getallusers", UserController.getAllUsers);
// router.get("/getuserbyid:id", UserController.getAllUsers);
router.get("/getuserbyid/:id", UserController.getOneUser);
router.patch("/updateuser/:id", UserController.updateUser);
router.delete("/deleteuser/:id", UserController.deleteUser);

export default router;
