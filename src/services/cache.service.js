var cache = require("global-cache");

module.exports = class Cache {
  constructor() {}

  get(key, storeFunction) {
    const value = cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then(result => {
      cache.set(key, result);
      return result;
    });
  }

  del(keys) {
    cache.del(keys);
  }

  flush() {
    cache.clear();
  }
};
