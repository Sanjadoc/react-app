const db = require('../services/db');
const bcrypt = require('bcrypt');
const { where } = require('../services/db');

class User {
  static tableName = 'users';

  static async findByName(userName) {
      return db.select().from(User.tableName).where({ email: userName }).first();
  }

  static async updateUser(user) {
      return db(User.tableName).where('id', '=', user.id).update({email: user.email, password: user.password, token: user.token});
  }

  static async createUser(email, password) {
     return await db(User.tableName)
        .insert({
            email: email,
            password: bcrypt.hashSync(password, 10)
    });
  }

  static findByToken(token) {
    return db.select().from(User.tableName).where({ token }).first();
  }

  static deleteUserToken(email) {
    return db(User.tableName).where('email', '=', email).update( {token: ''} );
  }  
  
}

module.exports = User;
