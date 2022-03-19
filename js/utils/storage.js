/**
 * Local storage key for todo data
 */

const key = {
  todoApp: "todo-app-data",
};

/**
 * Save data to local storage (as per target Key)
 *
 * @param {String} key local storage key
 *
 * @param {Object} data to be stored
 */

const setItem = function (key, data) {
  let json = JSON.stringify(data);
  setTimeout(localStorage.setItem(key, json), 0);
};

/**
 * Returns data from local storage (as per target Key)
 *
 * @param {String} key local storage key
 *
 * @returns {Object}
 */

const getItem = function (key) {
  let data = JSON.parse(localStorage.getItem(key));
  return data;
};

/**
 * Returns true if local storage contains the target key
 *
 * @param {String} key local storage key
 *
 */

const includes = function (key) {
  return localStorage.hasOwnProperty(key);
};

/**
 * Clear data from local storage (as per target Key)
 *
 * @param {String} key local storage key
 */

const clear = function (key) {
  return localStorage.clear(key);
};

export { key, setItem, getItem, includes, clear };
