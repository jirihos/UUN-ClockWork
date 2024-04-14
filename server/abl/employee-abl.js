const employeeDao = require("../dao/employee-mongo");
const schemas = require("../schema/index");
const { validate } = require("../validation");
const errors = require("../errors");

class employeeAbl {

    async create(req, res) {

    // validation
    await validate(schemas.employeeCreateSchema, req.body);

    let result = await employeeDao.findByCode(req.body);

    if (!result) {
        let newEmployee = await employeeDao.create(req.body)
        res.json(newEmployee);
    } else {
        throw new errors.UserAlreadyExists();
    }

    }

    async findByCode(req, res) {

    //validace inputu
    await validate(schemas.employeeFindByCodeSchema, req.body);

    let result = await employeeDao.findByCode(req.body);

    if (result) {

        res.json(result);

    } else {

        throw new errors.UserDoesNotExist();
    }

    }
 
}

module.exports = new employeeAbl();