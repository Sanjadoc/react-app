function checkAuthorized(req, res, next) {
  if (req.user) {
    next();
  } else {
    next('Access denied');
  }
}

module.exports = {
  checkAuthorized,
};
