module.exports = {
  QueryParametersValidationError: class extends Error {
    constructor() {
      super();
      this.code = "QueryParametersValidationError";
      this.message = "Query parameters are not valid.";
      this.status = 400;
    }
  },
  UserDoesNotExist: class extends Error {
    constructor() {
      super();
      this.code = "UserDoesNotExist";
      this.message = "The user doesn't exist.";
      this.status = 401;
    }
  },
  IncorrectPassword: class extends Error {
    constructor() {
      super();
      this.code = "IncorrectPassword";
      this.message = "The password is incorrect.";
      this.status = 401;
    }
  },
  NotAuthorized: class extends Error {
    constructor() {
      super();
      this.code = "NotAuthorized";
      this.message = "Not authorized.";
      this.status = 403;
    }
  },
  UserAlreadyExists: class extends Error {
    constructor() {
      super();
      this.code = "UserAlreadyExists";
      this.message = "The user already exists.";
      this.status = 400;
    }
  },
  DepartmentAlreadyExists: class extends Error {
    constructor() {
      super();
      this.code = "DepartmentAlreadyExists";
      this.message = "The department already exists.";
      this.status = 400;
    }
  },
  DepartmentDoesNotExist: class extends Error {
    constructor() {
      super();
      this.code = "DepartmentDoesNotExist";
      this.message = "The department doesn't exist.";
      this.status = 401;
    }
  },
};

//TODO EROR dept exists
