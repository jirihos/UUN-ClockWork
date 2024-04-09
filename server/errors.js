module.exports = {
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
};
