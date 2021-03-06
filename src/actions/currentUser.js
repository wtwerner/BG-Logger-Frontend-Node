import { fetchGamesFromQuery, fetchGamesFromUser } from './games'
// import { fetchPlaysFromUser } from './forms'
import { resetGames } from './games'
import { API_ROOT } from '../apiRoot'

// Synchronous Action Creators

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

export const clearCurrentUser = () => {
  return {
    type: "CLEAR_CURRENT_USER"
  }
}

// Asynchronous Action Creators

export const login = (credentials) => {
    return dispatch => {
        return fetch(`${API_ROOT}/users/login`, {
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
          .then(response => response.json())
          .then(response => {
            if (response.error) {
              alert(response.error)
            } else {
              dispatch(setCurrentUser(response))
              dispatch(fetchGamesFromQuery(''))
              dispatch(fetchGamesFromUser(response))
              // dispatch(fetchPlaysFromUser(response))
            }
        })
          .catch(console.log)
    }
}

export const logout = () => {
  return dispatch => {
    return fetch(`${API_ROOT}/users/logout`, {
      credentials: 'include',
      method: 'POST'
    })
      .then(dispatch(clearCurrentUser()))
      .then(dispatch(resetGames()))
  }
}

export const signup = (credentials) => {
  return dispatch => {
    const userInfo = {
      ...credentials
    }
    return fetch(`${API_ROOT}/users`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(response => {
        if (response.error) {
          alert(response.error)
        } else {
          dispatch(setCurrentUser(response))
          dispatch(fetchGamesFromUser(response))
          // dispatch(fetchPlaysFromUser(response))
          dispatch(fetchGamesFromQuery(''))
        }
      })
      .catch(console.log)
  }
}

export const getCurrentUser = () => {
  return dispatch => {
    return fetch(`${API_ROOT}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(r => r.json())
      .then(response => {
        if (response.error) {
          console.log(response.error)
        } else {
          dispatch(setCurrentUser(response))
          dispatch(fetchGamesFromQuery(''))
          dispatch(fetchGamesFromUser(response))
          // dispatch(fetchPlaysFromUser(response))
        }
      })
      .catch(console.log)
  }
}