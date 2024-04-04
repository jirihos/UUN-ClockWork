import "semantic-ui-css/semantic.min.css";

require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
