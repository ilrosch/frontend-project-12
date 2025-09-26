import * as yup from 'yup';

const ChannelSchema = (channels) =>
  yup.object().shape({
    value: yup
      .string()
      .trim()
      .min(3, 'Мининимум 3 символа!')
      .max(20, 'Максимум 20 символов!')
      .required('Обязательное поле')
      .test('uniq-channel', 'Такой канал уже существует!', (value) => {
        return !channels.some(({ name }) => name.toLowerCase() === value.toLowerCase());
      }),
  });

export default ChannelSchema;
