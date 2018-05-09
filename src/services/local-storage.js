const LOCAL_STORAGE_KEY = 'ufp-individual-data';

const LocalStorageService = {
  clear: clearLocalStorage,
  exists: checkForExistingStorage,
  get: getIdentityInformation,
  store: updateStorage
};

export default LocalStorageService;

//////

function checkForExistingStorage() {
  if (!testLocalStorage()) return false;
  return Boolean(localStorage.getItem(LOCAL_STORAGE_KEY));
}

function clearLocalStorage() {
  if (testLocalStorage()) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;
  } else {
    return false;
  }
}

function getIdentityInformation() {
  if (!testLocalStorage()) return false;
  
  const store = localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(store);
}

function updateStorage(updatedIdentityData) {
  if (!testLocalStorage()) return false;

  const payload = JSON.stringify(updatedIdentityData);
  localStorage.setItem(LOCAL_STORAGE_KEY, payload);
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
