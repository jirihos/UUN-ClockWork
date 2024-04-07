const userDao = require("../dao/user-mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserAbl {
  async login(req, res) {
    // TODO: validation

    const user = await userDao.getByUsername(req.body.username);
    if (user === null) {
      res.status(401).send("The user doesn't exist.");
      return;
    }

    const result = await bcrypt.compare(req.body.password, user.passwordHash);

    if (result) {
      const payload = {
        username: user.username,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } else {
      res.status(401).send("Incorrect password");
    }
  }

  async createUser(req, res) {
    // TODO: validation

    console.log(`User: ${JSON.stringify(req.user, null, 2)}`); // TODO: remove

    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "User is not authorized" });
      return;
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = await userDao.create({
      username: req.body.username,
      passwordHash,
      role: req.body.role,
    });

    res.json(user);
  }
}

module.exports = new UserAbl();
