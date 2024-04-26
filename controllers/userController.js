import UserModel from "../models/userModel.js";

class UserController {
  static addUser = async (req, res) => {
    const { name, location } = req.body;
    const user = await UserModel.findOne({ name: name });

    if (user) {
      res.send({ status: "failed", message: "User already exists!" });
    } else {
      try {
        if (!name) {
          res.status(500).send({
            status: "failed",
            message: "'name' field compulsory",
          });
        } else {
          const doc = new UserModel({
            name: name,
            location: location,
          });

          const temp = await doc.save();
          res.status(201).send({
            status: "success",
            message: "User added",
            res: temp,
          });
        }
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "Unable to Register" });
      }
    }
  };

  static getAllUsers = async (req, res) => {
    try {
      const usersCollection = await UserModel.find();
      res.send(usersCollection);
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Internal Server Error!" });
    }
  };

  static getOneUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await UserModel.findOne({ _id: userId });
      res.send(user);
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Internal Server Error!" });
    }
  };

  static updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, location } = req.body;
    try {
      const user = await UserModel.findById(id);
      const temp = await UserModel.findByIdAndUpdate(user._id, {
        $set: { name: name, location: location },
      });
      res.send({
        status: "success",
        message: "User Updated Successfully",
        res: temp,
      });
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "Internal Server Error or User not exists!",
      });
    }
  };

  static deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      // Find the user by ID and delete it
      const deletedUser = await UserModel.deleteOne({ _id: id });

      if (deletedUser.deletedCount === 0) {
        res.status(404).send({
          status: "failed",
          message: "User not found!",
        });
      } else {
        res.send({
          status: "success",
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  };
}

export default UserController;
