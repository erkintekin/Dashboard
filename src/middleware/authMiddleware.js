const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Yetkilendirme hatası: Token bulunamadı" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token doğrulama
    req.user = {
      id: decoded.id, // Kullanıcı ID'si
      role_id: decoded.role_id, // Kullanıcı rolü
    };
    next();
  } catch (err) {
    res.status(403).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};

module.exports = authenticateToken;
