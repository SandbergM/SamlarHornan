module.exports = class User {
  static email;
  static password;
  static username;
  static firstName;
  static lastName;

  constructor({ email, password, username, firstName, lastName }) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
};
