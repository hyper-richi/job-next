import axios, { AxiosError } from 'axios';
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
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error fetching upload file:', err.message);
    // return err;
  }
}

export async function fetchDeleteFile(imageId: number) {
  try {
    const response = await fetch(`https://6ede402e6a352dfb.mokky.dev/uploads/${imageId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return response;
    }
  } catch (error) {
    console.error('Error fetching delete file:', error);
    return error;
  }
}
