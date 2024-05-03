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
  TerminalAlreadyExists: class extends Error {
    constructor() {
      super();
      this.code = "TerminalAlreadyExists";
      this.message = "A terminal with the same name already exists.";
      this.status = 400;
    }
  },
  MaximumNumberOfEmployeesReached: class extends Error {
    constructor() {
      super();
      this.code = "MaximumNumberOfEmployeesReached";
      this.message = "The system has reached the maximum number of employees.";
      this.status = 403;
    }
  },
  EmployeeCodeNotFound: class extends Error {
    constructor() {
      super();
      this.code = "EmployeeCodeNotFound";
      this.message = "Couldn't find any employee with this code.";
      this.status = 400;
    }
  },
  DepartmentHasEmployee: class extends Error {
    constructor() {
      super();
      this.code = "DepartmentHasEmployee";
      this.message = "Department can not be deleted because there is employee.";
      this.status = 404;
    }
  },
};
