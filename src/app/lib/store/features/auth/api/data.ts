import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthApiResponse, LoginData } from '../types/authUserChema';
import { ImageFile } from '../../../../../../..';

export const fetchAuthUser = async (loginData: LoginData) => {
  const response = await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev/auth', loginData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const fetchDeleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(`https://6ede402e6a352dfb.mokky.dev/users/${userId}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error delete user:', err.message);
  }
};

export async function fetchUploadFile(formData: FormData) {
  try {
    const response = await axios.post<ImageFile>('https://6ede402e6a352dfb.mokky.dev/uploads', formData);
    /* if (!response.data) {
      throw new Error('Error fetching upload file');
    } */
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error fetching upload file:', err.message);
  }
}

/* export async function fetchDeleteFile(imageId: number) {
  try {
    const response = await axios.delete(`https://6ede402e6a352dfb.mokky.dev/uploads/${imageId}`);
    // if (!response.data) {
    //  throw new Error('Error fetching upload file');
    // }
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error fetching upload file:', err.message);
  }
} */

export async function fetchDeleteFile(imageId: number) {
  return await axios
    .delete(`https://6ede402e6a352dfb.mokky.dev/uploads/${imageId}`)
    .then((response) => response as AxiosResponse)
    .catch((error: AxiosError) => error);

  // return response;
  /*  console.error('Error fetching delete file:', error);

    throw new Error('Error fetching delete file'); */
}
