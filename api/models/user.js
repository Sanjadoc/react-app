const db = require("../services/db");

class User {
  static tableName = "users";

  static async createUser(user) {
    return db(User.tableName).insert({ ...user });
  }

  static async findByEmail(email) {
    return db.select().from(User.tableName).where({ email: email }).first();
  }

  static async updateToken(user) {
    return db(User.tableName)
      .where("id", "=", user.id)
      .update({ token: user.token });
  }

  static async findByToken(token) {
    return db.select("id").from(User.tableName).where({ token }).first();
  }

  static async deleteToken(email) {
    return db(User.tableName).where("email", "=", email).update({ token: "" });
  }

  static async setActive(userId) {
    return db(User.tableName)
      .where("id", "=", userId)
      .update({ active: "true" });
  }
}

module.exports = User;
