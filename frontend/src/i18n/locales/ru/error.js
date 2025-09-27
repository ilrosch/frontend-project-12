const error = {
  unknown: 'Неизвестная ошибка!',
  auth: {
    login: {
      401: 'Неверные имя пользователя или пароль!',
    },
    singup: {
      409: 'Пользователь уже существует!',
    },
  }
};

export default error;
