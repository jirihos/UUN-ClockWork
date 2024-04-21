require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middleware/error-handling-middleware");

const userRouter = require("./controller/user-controller");
const departmentRouter = require("./controller/department-controller");
const eventRouter = require("./controller/event-controller");
const employeeRouter = require("./controller/employee-controller");
const terminalRouter = require("./controller/terminal-controller");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/department", departmentRouter);
app.use("/api/event", eventRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/terminal", terminalRouter);

// error-handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
