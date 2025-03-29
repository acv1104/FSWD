import User from '../models/User.js';
import StorageService from './StorageService.js';

export default class AuthService {
  constructor() {
    this.storageService = new StorageService();
    this.currentUser = null;
  }

  signup(name, email, password) {
    const users = this.storageService.getItems('users') || [];

    if (users.some(user => user.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser = new User(null, name, email, password);
    users.push(newUser);
    this.storageService.setItems('users', users);
    
    this.currentUser = newUser;
    return newUser;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}
