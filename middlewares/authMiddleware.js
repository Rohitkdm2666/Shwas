// const jwt = require('jsonwebtoken');
// const SECRETE = "RohitKadam@666";

// function authenticate(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Token missing" });

//   try {
//     const decoded = jwt.verify(token, SECRETE);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// }
// module.exports = authenticate;
