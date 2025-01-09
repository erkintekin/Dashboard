const restrictToSelf = (req, res, next) => {
  const { id } = req.params; // Route'dan gelen ID
  const userId = req.user.id; // Token'dan gelen kullanıcı ID'si

  if (parseInt(id) !== userId) {
    return res
      .status(403)
      .json({ message: "Bu bilgilere erişim izniniz yok." });
  }

  next();
};

module.exports = restrictToSelf;
