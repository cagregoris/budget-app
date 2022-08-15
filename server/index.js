const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());


// Routes
// Register and Login routes
app.use("/auth", require("./routes/jwtAuth"));



app.listen(3000, () => {
  console.log("server is running on port 3000")
});