const jwt = require("jsonwebtoken");

module.exports = async function checkLogin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ msg: "Acesso Negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (erro) {
    res.status(401).json({ msg: "Token Invalido" });
  }
};
