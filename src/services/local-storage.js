import defaultData from '@/mock/test-user-1.js';
const LOCAL_STORAGE_KEY = 'ufp-individual-data';
let identityData;

const LocalStorageService = {
  clear: clearLocalStorage,
  get: getIdentityInformation,
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

function getIdentityInformation() {
  return identityData;
}

function init() {
  if (!testLocalStorage()) return;
  let store = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (store) {
    identityData = Object.assign({}, defaultData);
    return true;
  } else {
    this.update();
    return false;
  }
}

function updateStorage(updatedIdentityData) {
  if (!testLocalStorage()) return false;
  
  let clone = Object.assign({}, updatedIdentityData);
  // TODO these should be coming from the uPort profile
  // won't need to delete them once they are
  delete clone.firstName;
  delete clone.lastName;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clone));
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
