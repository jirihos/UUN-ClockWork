const terminalDao = require("../dao/terminal-mongo");
const schemas = require("../schema/index");
const { validate } = require("../validation");
const errors = require("../errors");
const { generateApiKey } = require("../helper/api-key-helper");

class TerminalAbl {
  async create(req, res) {
    // validation
    await validate(schemas.terminalCreate, req.body);

    // authorize admin
    if (req.user?.role !== "admin") {
      throw new errors.NotAuthorized();
    }

    let name = req.body.name.trim();

    const test = await terminalDao.findByName(name);
    if (test != null) {
      throw new errors.TerminalAlreadyExists();
    }

    const terminal = await terminalDao.create({
      name,
      apiKey: generateApiKey(64),
    });

    res.json(terminal);
  }
}

module.exports = new TerminalAbl();
