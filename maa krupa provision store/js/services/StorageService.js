export default class StorageService {
  getItems(key) {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : null;
  }

  setItems(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}
