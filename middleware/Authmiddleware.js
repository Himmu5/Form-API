function authenticateToken(req, res, next) {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // If the token is valid, you can store the user information in the request for future use
    if (decoded) {
      req.email = decoded.email;
    }
    next();
  });
}
