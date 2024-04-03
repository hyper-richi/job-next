import axios, { AxiosError, AxiosResponse } from 'axios';
import { ImageFile } from '../types/fileSchema';

export async function fetchUploadFile(formData: FormData) {
  return await axios
    .post<ImageFile>('https://6ede402e6a352dfb.mokky.dev/uploads', formData)
    .then((response: AxiosResponse) => response)
    .catch((error: AxiosError) => error);
}

/* export async function fetchDeleteFile(imageId: number) {
  return await axios
    .delete(`https://6ede402e6a352dfb.mokky.dev/uploads/${imageId}`)
    .then((response) => response as AxiosResponse)
    .catch((error: AxiosError) => error);
} */

export async function fetchDeleteFile(imageId: number) {
  try {
    const response = await axios.delete(`https://6ede402e6a352dfb.mokky.dev/uploads/${imageId}`);
    if (!response.data) {
      throw new Error('Error fetching upload file');
    }
    return response;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error fetching upload file:', err.message);
    return err;
  }
}
