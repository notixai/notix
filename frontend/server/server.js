const express = require("express");
const mongoose = require('mongoose');

const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(require("./routes/upload"));

app.use(require("./routes/summaries"));
 
app.listen(port, () => {
  mongoose.connect("mongodb://db:27017/notix",{}).then(()=>{
    console.log("DB is connected")
  });
  console.log(`Server is running on port: ${port}`);
});