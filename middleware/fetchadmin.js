const jwt = require("jsonwebtoken");

const fetchAdmin = (req, res, next) => {
  // Get the jwt token from the header
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = data.admin;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchAdmin;
