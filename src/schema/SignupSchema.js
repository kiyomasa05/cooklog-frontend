import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  name: yup.string().max(50, '名前は50文字以内で入力して下さい').required('名前は必須です'),
  email: yup.string().email('正しいメールアドレスを入力してください').required('emailは必須です'),
  password: yup
    .string()
    .min(4, 'passwordは4文字以上で入力して下さい')
    .max(15, 'passwordは15文字以内で入力して下さい')
    .required('パスワードは必須です'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], '再入力passwordが一致しません'),
});

export default SignupSchema;
