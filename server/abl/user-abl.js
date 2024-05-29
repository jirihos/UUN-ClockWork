const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../dao/user-mongo");
const schemas = require("../schema/index");
const { validate } = require("../validation");
const errors = require("../errors");

class UserAbl {
  async login(req, res) {
    // validation
    await validate(schemas.userLoginSchema, req.body);

    // get user
    const user = await userDao.getByUsername(req.body.username);
    if (user === null) {
      throw new errors.UserDoesNotExist();
    }

    // compare the password
    const result = await bcrypt.compare(req.body.password, user.passwordHash);

    if (result) {
      const { username, role } = user;

      // create a token
      const payload = {
        username,
        role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "14d", // TODO: change to 1h
      });

      res.json({
        token,
        username,
        role,
      });
    } else {
      throw new errors.IncorrectPassword();
    }
  }

  async create(req, res) {
    // validation
    await validate(schemas.userCreateSchema, req.body);

    // authorize admin
    if (req.user?.role !== "admin") {
      throw new errors.NotAuthorized();
    }

    // throw an error if the user already exists
    const user = await userDao.getByUsername(req.body.username);
    if (user != null) {
      throw new errors.UserAlreadyExists();
    }

    // hash the password
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    // create a user in a database
    const newUser = await userDao.create({
      username: req.body.username,
      passwordHash,
      role: req.body.role,
    });

    res.json(newUser);
  }

  async me(req, res) {
    // authorization
    if (!req.user) {
      throw new errors.NotAuthorized();
    }

    const { username, role, exp } = req.user;

    res.json({
      username: username,
      role: role,
      expiresIn: exp * 1000 - Date.now(),
    });
  }

  async delete(req, res) {
    // validation
    await validate(schemas.userDeleteByUsernameSchema, req.body);

    // authorization
    if (!req.user) {
      throw new errors.NotAuthorized();
    }

    // authorize admin
    if (req.user?.role !== "admin") {
      throw new errors.NotAuthorized();
    }

    // Find user by username
    const { username } = req.body;
    const result = await userDao.getByUsername(username);

    if (result) {
      // If user exists, delete it
      await userDao.deleteByUsername(username);
      res.json(req.body);
    } else {
      throw new errors.UserDoesNotExist();
    }
  }
}

module.exports = new UserAbl();
