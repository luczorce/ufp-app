const axios = require('axios');
const REQUESTS_URL = process.env.VUE_APP_REQUESTS_URL;

const RequestsProvider = {
  getRequests: getAllRequests,
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
          reject(response)
        }
      })
      .catch(e => reject(e));
  })
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
