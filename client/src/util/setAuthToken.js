import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to ever request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth headers
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
