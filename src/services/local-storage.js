const LOCAL_STORAGE_KEY = 'ufp-individual-data';

const LocalStorageService = {
  clear: clearLocalStorage,
  init: init,
  update: updateStorage
};

export default LocalStorageService;

//////

function clearLocalStorage() {
  if (testLocalStorage()) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;
  } else {
    return false;
  }
}

function init() {
  if (!testLocalStorage()) return;
  let store = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (store) {
    // TODO update this storage here with what's in storage
    return true;
  } else {
    this.update();
    return false;
  }
}

function updateStorage() {
  if (!testLocalStorage()) return false;
  
  let store = [];
  
  // TODO what gets updated?
  // this.locations.forEach(loc => {
  //   let clone = Object.assign({}, loc);
  //   delete clone.name;
  //   delete clone.description;
  //   delete clone.optional;
  //   delete clone.secret;

  //   store.push(clone);
  // });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}

//////

function testLocalStorage() {
  const test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}
