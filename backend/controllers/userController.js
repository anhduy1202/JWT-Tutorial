const User = require("../models/User");

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A USER
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
