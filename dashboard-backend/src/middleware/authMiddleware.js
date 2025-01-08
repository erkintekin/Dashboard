const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Yetkilendirme hatası: Token başlığı eksik" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Yetkilendirme hatası: Token bulunamadı" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    // Burada role_id olarak atayın
    req.user = {
      id: decoded.id,
      role_id: decoded.role_id,
    };

    console.log("authMiddleware'deki req.user:", req.user);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token süresi dolmuş" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Geçersiz token" });
    }

    res.status(500).json({
      message: "Yetkilendirme sırasında hata oluştu",
      error: err.message,
    });
  }
};

module.exports = authenticateToken;
