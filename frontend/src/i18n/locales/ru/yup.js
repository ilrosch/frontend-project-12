const yup = {
  min_one: 'Минимум {{count}} символ!',
  min_few: 'Минимум {{count}} символа!',
  min_many: 'Минимум {{count}} символов!',

  max_one: 'Максимум {{count}} символ!',
  max_few: 'Максимум {{count}} символа!',
  max_many: 'Максимум {{count}} символов!',

  required: 'Обязательное поле!',

  form: {
    passwordsMustMatch: 'Пароли должны совпадать!',
  },

  channel: {
    exists: 'Канал уже существует!'
  },
};

export default yup;
