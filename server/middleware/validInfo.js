module.exports = (req, res, next) => {
  const { username, firstName, password } = req.body;

  function validUsername(username) {
    return /^[A-Za-z0-9]*$/.test(username);
  }

  if (req.path === "/register") {
    // console.log(!username.length);
    if (![username, firstName, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid Username");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid Username");
    }
  }

  next();
};