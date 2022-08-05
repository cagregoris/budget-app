const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());


// Routes




app.listen(3000, () => {
  console.log("server is running on port 3000")
});