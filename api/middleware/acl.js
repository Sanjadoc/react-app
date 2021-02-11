function checkAuthorized(req, res, next) {
  if (req.user) {
    console.log("Authorized content - ok");
    next();
  } else {
    next("Access denied. You are not authorized");
  }
}

module.exports = {
  checkAuthorized,
};
