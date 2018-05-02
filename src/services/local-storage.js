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
    identityData = JSON.parse(store);
    return true;
  } else {
    identityData = Object.assign({}, defaultData);
    this.update(identityData);
    return false;
  }
}

function updateStorage(updatedIdentityData) {
  if (!testLocalStorage()) return false;
  
  let clone = Object.assign({}, updatedIdentityData);
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