const express = require("express");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//app.use(require("./routes/record"));

app.post("/api/upload-audio", upload.single('audio-upload'),(req,res)=> {
  try{
    console.log(req.body)
    console.log(req.file);
    res.json(200).end();
  }catch(err){
    console.error(err);
    res.json(500);
  }
  
})
// Get MongoDB driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});