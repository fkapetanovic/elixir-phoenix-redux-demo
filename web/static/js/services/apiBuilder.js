import * as actions from '../actions/constants'

const API_PATH = '/api/v1'
const AUTH_API_PATH = `${API_PATH}/auth`

export const buildApiRequest = (requestName, data) => {
  return requests[requestName](data)
}

const requests = {
  [actions.DELETE_JOG]: (data) => {
    const { userId, jogId } = data
    const url = `${AUTH_API_PATH}/users/${userId}/jogs/${jogId}`
    return requestConfig('delete', url)
  },
  [actions.DELETE_USER]: (data) => {
    const { userId } = data
    const url = `${AUTH_API_PATH}/users/${userId}`
    return requestConfig('delete', url)
  },
  [actions.GET_CURRENTUSER]: (data) => {
    return requestConfig('get', `${API_PATH}/sessions`)
  },
  [actions.GET_JOGS]: (data) => {
    const { userId }  = data
    const url = `${AUTH_API_PATH}/users/${userId}/jogs`
    return requestConfig('get', url)
  },
  [actions.GET_USERS]: (data) => {
    return requestConfig('get', `${AUTH_API_PATH}/users`)
  },
  [actions.INSERT_JOG]: (data) => {
    const { userId, jog }  = data
    const url = `${AUTH_API_PATH}/users/${userId}/jogs`
    return requestConfig('post', url, { ...data, jog: convertJog(jog) })
  },
  [actions.INSERT_USER]: (data) => {
    return requestConfig('post', `${AUTH_API_PATH}/users/`, data)
  },
  [actions.JOGS_REPORT]: (data) => {
    const { userId, filter }  = data
    const start_date = filter.start_date ? filter.start_date : ''
    const end_date = filter.end_date ? filter.end_date : ''
    const query = `start_date=${start_date}&end_date=${end_date}`
    const url = `${AUTH_API_PATH}/users/${userId}/jogs/report?${query}`
    return requestConfig('get', url)
  },
  [actions.LOGIN]: (data) => {
    const { userId }  = data
    const url = `${API_PATH}/sessions`
    return requestConfig('post', url, data)
  },
  [actions.LOGOUT]: (data) => {
    return requestConfig('delete', `${AUTH_API_PATH}/sessions`)
  },
  [actions.REGISTER]: (data) => {
    const { userId }  = data
    const url = `${API_PATH}/registrations`
    return requestConfig('post', url, data)
  },
  [actions.SEARCH_JOGS]: (data) => {
    const { userId, filter }  = data
    const start_date = filter.start_date ? filter.start_date : ''
    const end_date = filter.end_date ? filter.end_date : ''
    const query = `start_date=${start_date}&end_date=${end_date}`
    const url = `${AUTH_API_PATH}/users/${userId}/jogs/search?${query}`
    return requestConfig('get', url)
  },
  [actions.UPDATE_JOG]: (data) => {
    const { jog, userId }  = data
    const url = `${AUTH_API_PATH}/users/${userId}/jogs/${jog.id}`
    return requestConfig('put', url, { ...data, jog: convertJog(jog) })
  },
  [actions.UPDATE_USER]: (data) => {
    const { user }  = data
    const url = `${AUTH_API_PATH}/users/${user.id}`
    return requestConfig('put', url, data)
  }
}

const requestConfig = (method, url, data = null) => {
  let config = {}

  config.method = method
  config.url = url
  if (data) config.data = data

  return config
}

const convertJog = (jog) => {
  let time = 0

  if (jog.hours) time += parseInt(jog.hours) * 3600
  if (jog.minutes) time += parseInt(jog.minutes) * 60
  if (jog.seconds) time += parseInt(jog.seconds)

  return {
    jog_date: jog.jog_date,
    distance: jog.distance,
    time    : time
  }
}
