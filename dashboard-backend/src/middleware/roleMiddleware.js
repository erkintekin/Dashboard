const allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log("roleMiddleware'deki req.user:", req.user);
    console.log("Kullanıcı Rolü:", req.user.role_id);

    if (!roles.includes(req.user.role_id)) {
      console.log("Erişim engellendi. Kullanıcı Rolü:", req.user.role_id);
      return res.status(403).json({ message: "Erişim engellendi" });
    }
    next();
  };
};

module.exports = allowRoles;
