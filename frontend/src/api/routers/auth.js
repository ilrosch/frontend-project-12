import axios from "../clients/axios";

const login = async (credentials) => {
  try {
    const res = await axios.post('api/v1/login', credentials);
    return res.data;
  } catch ({ status }) {
    switch (status) {
      case 401:
        throw new Error('Неверные имя пользователя или пароль!');
      default:
        throw new Error('Неизвестная ошибка');
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
        throw new Error('Пользователь уже существует!');
      default:
        throw new Error('Неизвестная ошибка');
    }
  }
};

export { login, singUp };
