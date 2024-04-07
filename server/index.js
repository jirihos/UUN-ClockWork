require("dotenv").config();
const express = require("express");

const userRouter = require("./controller/user-controller");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
