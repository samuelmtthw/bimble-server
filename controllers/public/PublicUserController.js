const { User } = require("../../models");
const { comparePassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");
const sendEmail = require('../../helpers/nodemailer')

class PublicUserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const createUser = await User.create({
        name,
        email,
        password,
        role: "User",
      });

      const response = {
        name: createUser.name,
        email: createUser.email,
        role: createUser.role,
      }

      const payload = {
        email: response.email,
        text: `
        Hello ${response.name} ${response.email}!
        <br/>
        Thank you for joining Bimble,
        Enjoy your stay here!`
      }
      sendEmail(payload)
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "InvalidInput" };
      }

      if (!comparePassword(password, foundUser.password)) {
        throw { name: "InvalidInput" };
      }

      const payload = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };

      const token = signToken(payload);

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async readUser(req, res, next) {
    try {
      const response = await User.findOne({
        where: {
          email: req.user.email,
        },
        attributes: {
          exclude: ["id", "password", "updatedAt", "createdAt"],
        },
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const response = await User.update(
        {
          name,
          email,
        },
        {
          where: {
            email: req.user.email,
          },
          returning: true,
        }
      );

      res.status(200).json({ message: "User has been updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicUserController;
