import axios from 'axios'

export function api(config) {
  const token = getItem('auth-token')

  return axios({
		url   : config.url,
    data  : config.data,
		method: config.method,
    headers: {
      'Authorization' : token
    }
	})
  .then((response) => {
    return { response: response.data }
  })
  .catch((error) => {
    let message = 'Error occurred.'

    if (error.response.data.error) {
      message = error.response.data.error
    } else if (error.response.data.errors) {
      let errors = error.response.data.errors[0]
      message = errors[Object.keys(errors)[0]]
    }

    return {
      error : message,
      status: error.response.status
    }
  })
}

export function getItem(name) {
  return localStorage.getItem(name)
}

export function setItem(name, value) {
  localStorage.setItem(name, value)
}

export function removeItem(name) {
  localStorage.removeItem(name)
}
