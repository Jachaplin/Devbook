import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

// Get current profile
export const getCurrentProfile = () => dispach => {
  dispach(setProfileLoading());
  axios.get('/api/profile')
    .then(res => 
      dispach({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispach({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

// Create profile
export const createProfile = (profileData, history) => dispach => {
  axios.post('/api/profile', profileData)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispach({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}