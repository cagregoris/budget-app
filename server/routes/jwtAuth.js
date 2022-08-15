const router = require("express").Router();
const pool = require("../db");
const bcrypt = require('bcrypt');
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");

// Registering
router.post("/register", validInfo, async(req, res) => {
  try {
    const { username, firstName, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);

    if(user.rows.length !== 0) {
      return res.status(401).send("User already exists!")
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query("INSERT INTO users (username, first_name, password) VALUES ($1, $2, $3) RETURNING *", [username, firstName, bcryptPassword]);

    // res.json(newUser.rows[0]);

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });


  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})



//login route

router.post("/login", validInfo, async(req, res) => {
  try {

    const { username, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);


    if(user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if(!validPassword) {
      return res.status(401).json("Password or email is incorrect");
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({token});

    
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;