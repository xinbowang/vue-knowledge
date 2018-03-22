const setStorage = (name, value) => {
  sessionStorage.setItem(name, JSON.stringify(value));
}

const getStorage = (name) => {
  return JSON.parse(sessionStorage.getItem(name));
}

const removeStorage = (name) => {
  sessionStorage.removeItem(name);
}

export {setStorage, getStorage, removeStorage};
