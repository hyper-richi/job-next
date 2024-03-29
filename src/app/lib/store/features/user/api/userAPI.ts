import { LoginByEmailProps } from '../../../../../../..';
import { AuthUserSchema } from '../types/userSchema';

export const fetchAuthUser = async (loginData: LoginByEmailProps) => {
  const response = await fetch('https://6ede402e6a352dfb.mokky.dev/auth', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...loginData }),
  });
  console.log('fetchAuthUser-response: ', response);

  if (!response) {
    throw new Error();
  }
  const result: { data: AuthUserSchema } = await response.json();
  return result;
};
