const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./config/db");

const bodyParser = require("body-parser");
const cors = require("cors");
const GenieRoutes = require("./routes/genie.route");

connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", GenieRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
