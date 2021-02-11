const db = require("../services/db");

function checkAuth(req, res, next) {
  if (req.user) {
    console.log("Authorized content - ok");
    next();
  } else {
    next("Access denied. You are not authorized");
  }
}

function checkOwnerData(tableName, columnOwnName = "userId", columnIdName="id"){
  return async function (req, res, next){
    const owner = await db.select(columnOwnName).from(tableName).where(columnIdName, req.params.id).first();
      if (owner && req.user && req.user.id == owner[columnOwnName]) {
        next();
      } else {
        res.status(401).send({message: "Access denied. It is no own user data"});
      }
  };
}

module.exports = {
  checkAuth,
  checkOwnerData,
};
