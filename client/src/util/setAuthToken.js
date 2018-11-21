import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to ever request
    axios.default.headers.common['Authorization'] = token;
  } else {
    // Delete auth headers
    delete axios.default.headers.common['Authorization'];
  }
};

export default setAuthToken;
