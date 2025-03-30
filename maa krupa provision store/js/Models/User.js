export default class User {
  constructor(id, name, email, password, createdAt) {
    this.id = id || this.generateId();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date().toISOString();
    this.isActive = true;
  }

  generateId() {
    return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  validatePassword(inputPassword) {
    return this.password === inputPassword;
  }
}
