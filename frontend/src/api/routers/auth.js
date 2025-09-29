import axios from '../clients/axios'

const handleAuthError = ({ code, status }) => {
  if (code === 'ERR_NETWORK') {
    throw 'toast.net'
  }

  switch (status) {
    case 401:
      throw 'error.auth.login.401'
    case 409:
      throw 'error.auth.signup.409'
    default:
      throw 'error.unknown'
  }
}

const login = async (credentials) => {
  try {
    const res = await axios.post('api/v1/login', credentials)
    return res.data
  }
  catch (error) {
    handleAuthError(error)
  }
}

const signup = async (credentials) => {
  try {
    const res = await axios.post('api/v1/signup', credentials)
    return res.data
  }
  catch (error) {
    handleAuthError(error)
  }
}

export { login, signup }
