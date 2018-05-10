const axios = require('axios');
const REQUESTS_URL = process.env.VUE_APP_REQUESTS_URL;

const RequestsProvider = {
  signup: signUpNewUser
}

export default RequestsProvider;

//////

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
