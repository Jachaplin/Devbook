import axios from 'axios';
import { 
  GET_PROFILE, 
  PROFILE_LOADING, 
  CLEAR_CURRENT_PROFILE, 
  GET_ERRORS,
  SET_CURRENT_USER 
} from './types';

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

// Delete profile and account
export const deleteAccount = () => dispach => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios.delete('/api/profile')
      .then(res =>
        dispach({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispach({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
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
