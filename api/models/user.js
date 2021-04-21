const db = require("../services/db");

class User {
  static tableName = "users";

  static async getAllUsers() {
    return db.select().from(User.tableName).orderBy("id");
  }

  static async createUser(user) {
    return db(User.tableName).insert({ ...user });
  }

  static async updateUserById(userId, newUserData) {
    return db(User.tableName)
      .where("id", "=", userId)
      .update({
        email: newUserData.email,
        password: newUserData.password,
        first_name: newUserData.first_name,
        last_name: newUserData.last_name,
        age: newUserData.age,
        university: newUserData.university,
        phone_number: newUserData.phone_number,
        data: newUserData.data,
        work_place: newUserData.work_place,
      });
  }

  static async deleteUserById(userID) {
    return db(User.tableName).where("id", "=", userID).delete();
  }

  static async findByEmail(email) {
    return db.select().from(User.tableName).where({ email }).first();
  }

  static async findById(id) {
    return db.select().from(User.tableName).where({ id }).first();
  }

  //all for user auth token
  static async updateRefreshToken(userId, refreshToken) {
    return db(User.tableName).where("id", "=", userId).update({ refreshToken });
  }

  static async getUserData(refreshToken) {
    return db.select().from(User.tableName).where({ refreshToken }).first();
  }

  static async deleteRefreshToken(refreshToken) {
    return db(User.tableName).where({refreshToken}).update({ refreshToken: "" });
  }

  //all for email activate
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
