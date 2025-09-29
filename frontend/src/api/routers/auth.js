import axios from "../clients/axios";

const login = async (credentials) => {
  try {
    const res = await axios.post('api/v1/login', credentials);
    return res.data;
  } catch ({ status }) {
    switch (status) {
      case 401:
        throw new Error('error.auth.login.401');
      default:
        throw new Error('error.unknown');
    }
  }
}

const singUp = async (credentials) => {
  try {
    const res = await axios.post('api/v1/signup', credentials);
    return res.data;
  } catch ({ status }) {
    switch (status) {
      case 409:
        throw new Error('error.auth.singup.409');
      default:
        throw new Error('error.unknown');
    }
  }
};

export { login, singUp };
