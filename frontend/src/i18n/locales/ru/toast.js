const toast = {
  net: 'Ошибка соединения',
  auth: {
    login: {
      pending: 'Выполняется вход',
      success: 'Вход выполнен',
      // error: 'Произошла ошибка',
    },
    logout: {
      pending: 'Выход из профиля',
      success: 'Успешный выход',
      error: 'Произошла ошибка',
    },
    signup: {
      pending: 'Создание профиля',
      success: 'Профиль создан',
      // error: 'Произошла ошибка',
    },
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
      // error: 'Произошла ошибка',
    },
    remove: {
      pending: 'Канал удаляется',
      success: 'Канал удалён',
      error: 'Произошла ошибка',
    },
    rename: {
      pending: 'Канал переименовывается',
      success: 'Канал переименован',
      // error: 'Произошла ошибка',
    },
  },
}

export default toast
