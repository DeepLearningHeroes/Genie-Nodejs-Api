const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./config/db");
const cron = require("node-cron");

const bodyParser = require("body-parser");
const cors = require("cors");
const GenieRoutes = require("./routes/genie.route");
const { default: axios } = require("axios");

connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", GenieRoutes);

function fetchJobsFromInternet() {
  axios
    .get("http://127.0.0.1:5000/admin/cron")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Schedule the task
// will uncomment it when we will deploy this
// This cron job would be executed every 12 hours
// cron.schedule("0 */12 * * *", fetchJobsFromInternet);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
