import axios from 'axios';
import { 
  GET_PROFILE,
  GET_PROFILES, 
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

// Get All profiles
export const getProfiles = () => dispach => {
  dispach(setProfileLoading());
  axios.get('/api/profile/all')
    .then(res => 
      dispach({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispach({
        type: GET_PROFILES,
        payload: null
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

// Add experience
export const addExperience = (expData, history) => dispach => {
  axios.post('api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispach({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add education
export const addEducation = (eduData, history) => dispach => {
  axios.post('api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispach({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete Experience
export const deleteExperience = (id) => dispach => {
  axios.delete(`api/profile/experience/${id}`)
    .then(res => 
      dispach({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispach({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete Education
export const deleteEducation = (id) => dispach => {
  axios.delete(`api/profile/education/${id}`)
    .then(res => 
      dispach({
        type: GET_PROFILE,
        payload: res.data
      })
    )
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
