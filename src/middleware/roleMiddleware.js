// Sadece belirli rollerin erişimi için kısıtlama middleware'i

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Erişim engellendi" });
    }
    next();
  };
};

module.exports = allowRoles;
