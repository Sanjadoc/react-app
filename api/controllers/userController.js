const User = require("../models/user");
const db = require("../services/db");
const bcrypt = require("bcrypt");
const path = require("path");

class userController {
  async getAllUsers(req, res, next) {
    try {
      const dataUsers = await User.getAllUsers();
      res.json(dataUsers);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  async getOneUser(req, res, next) {
    try {
      const dataUser = await User.findById(req.params.id);
      res.json(dataUser);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  async updateUser(req, res, next) {
    const date = new Date();
    try {
      const userData = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password ? req.body.password : req.body.email, 10),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        university: req.body.university,
        phone_number: req.body.phone_number,
        data: req.body.data,
        work_place: req.body.work_place,
      };
      const { id } = req.params;
      await User.updateUserById(id, userData);
      res.send(`User with id = ${id} was updated`);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.deleteUserById(id);

      res.send(`User with id = ${id} was deleted`);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async updateAvatar(req, res) {
    const { id } = req.params;
    console.log(req.file.filename);
    const user = await User.findById(id);
    if (user) {
      try {
        await db(User.tableName).where("id", id).update({ avatar: (req.file.filename).trim() });

        return res.status(200).send(`Avatar wos updated ${req.file.filename}`);
      } catch (error) {
        res.status(400).json(error.message);
      }
    }
  }

  async getAvatar(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    const avatar = user?.avatar;

    res.sendFile(`${avatar?.trim()}`, { root: process.env.ROOT_IMG_DIR });
  }
}

module.exports = new userController();
