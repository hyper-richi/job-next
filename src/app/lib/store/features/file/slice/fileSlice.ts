import { createAppSlice } from '../../../createAppSlice';
import { FileSchema, ImageFile, ResponseError } from '../types/fileSchema';
import axios, { AxiosError, AxiosResponse } from 'axios';

const initialState: FileSchema = {
  file: null,
  status: 'idle',
  error: null,
};

export const fileSlice = createAppSlice({
  name: 'file',
  initialState,
  reducers: (create) => ({
    uploadFile: create.asyncThunk<ImageFile, FormData>(
      async (formData, thunkApi) => {
        const { /* extra, dispatch, */ rejectWithValue } = thunkApi;

        try {
          const response = await axios.post<ImageFile>('https://6ede402e6a352dfb.mokky.dev/uploads', formData);
          if (!response.data) {
            throw new Error('Ошибка в обработке запроса, повторите попытку позже!');
          }
          return response.data;
        } catch (error) {
          const err = error as AxiosError;
          return rejectWithValue({
            message: 'Ошибка в обработке запроса: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          });
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.payload as ResponseError;
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.error = null;
          state.file = action.payload;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
    deleteFile: create.asyncThunk<AxiosError | AxiosResponse, number>(
      async (imageId, thunkApi) => {
        const { /* extra, dispatch, */ rejectWithValue } = thunkApi;
        try {
          const response = await axios.delete(`https://6ede402e6a352dfb.mokky.dev/uploads/${imageId}`);
          if (!response.data) {
            throw new Error('Ошибка при удалении файла');
          }
          return response;
        } catch (error) {
          const err = error as AxiosError;
          return rejectWithValue({
            message: 'Ошибка при удалении файла: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          } as ResponseError);
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.payload as ResponseError;
        },
        fulfilled: (state) => {
          state.status = 'idle';
          state.file = null;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
  }),
  selectors: {
    selectFile: (state) => state.file,
    selectFileError: (state) => state.error,
    selectStatusUploadFile: (state) => state.status,
  },
});

export const { deleteFile, uploadFile } = fileSlice.actions;
export const { selectFile, selectStatusUploadFile, selectFileError } = fileSlice.selectors;
