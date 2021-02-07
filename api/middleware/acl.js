function checkAuthorized(req, res, next) {
  if (req.user) {
    console.log("Authorized content - ok");
    next();
  } else {
    next("Access denied");
  }
}

module.exports = {
  checkAuthorized,
};
