const yup = {
  min_one: 'Не менее {{count}} символ!',
  min_few: 'Не менее {{count}} символа!',
  min_many: 'Не менее {{count}} символов!',

  max_one: 'Не более {{count}} символ!',
  max_few: 'Не более {{count}} символа!',
  max_many: 'Не более {{count}} символов!',

  customLen: 'От 3 до 20 символов',
  required: 'Обязательное поле!',

  form: {
    passwordsMustMatch: 'Пароли должны совпадать!',
  },

  channel: {
    exists: 'Канал уже существует!',
  },
}

export default yup
