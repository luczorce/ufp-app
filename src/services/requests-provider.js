const axios = require('axios');
const REQUESTS_URL = process.env.VUE_APP_REQUESTS_URL;

const RequestsProvider = {
  getRequests: getAllRequests,
  sendResponse: sendResponse,
  signup: signUpNewUser
}

export default RequestsProvider;

//////

function getAllRequests() {
  const url = `${REQUESTS_URL}/request`;

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(e => reject(e));
  });
}

function sendResponse(requestKey, deviceKey) {
  const url = `${REQUESTS_URL}/response`;
  const body = {
    deviceKey: deviceKey,
    requestKey: requestKey
  };

  return new Promise((resolve, reject) => {
    axios.post(url, body)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(e => reject(e));
  });
}

function signUpNewUser() {
  const url = `${REQUESTS_URL}/signup`;

  return new Promise((resolve, reject) => {
    axios.post(url)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch(e => reject(e));
  });
}
