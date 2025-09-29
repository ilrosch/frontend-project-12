import * as yup from 'yup';

const ChannelSchema = (t, channels) =>
  yup.object().shape({
    value: yup
      .string()
      .trim()
      // .min(3, t('yup.min', { count: 3 }))
      // .max(20, t('yup.max', { count: 20 }))
      .required(t('yup.required'))
      .test('min-max', t('yup.customLen'), (value) => value.length > 2 && value.length < 21)
      .test('uniq-channel', t('yup.channel.exists'), (value) => {
        return !channels.some(({ name }) => name.toLowerCase() === value.toLowerCase());
      }),
  });

export default ChannelSchema;
