const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());


// Routes
// Register and Login routes
app.use("/auth", require("./routes/jwtAuth"));

//Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));



app.listen(5001, () => {
  console.log("server is running on port 5001")
});