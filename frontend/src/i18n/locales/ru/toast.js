const toast = {
  auth: {
    login: {
      pending: 'Выполняется вход',
      success: 'Выполнен вход',
      error: 'Произошла ошибка',
    },
    logout: {
      pending: 'Выход из профиля',
      success: 'Успешный выход',
      error: 'Произошла ошибка',
    },
    singup: {
      pending: 'Создание профиля',
      error: 'Произошла ошибка',
    }
  },
  chat: {
    init: {
      pending: 'Загрузка данных',
      error: 'Ошибка загрузки данных',
    },
  },
  channel: {
    add: {
      pending: 'Канал создается',
      success: 'Канал создан',
      error: 'Произошла ошибка',
    },
    remove: {
      pending: 'Канал удаляется',
      success: 'Канал удален',
      error: 'Произошла ошибка',
    },
    rename: {
      pending: 'Канал переименовывается',
      success: 'Канал переименован',
      error: 'Произошла ошибка',
    },
  },
};

export default toast;
