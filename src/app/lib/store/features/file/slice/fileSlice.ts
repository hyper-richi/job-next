import { ResponseError } from '../../../../../../..';
import { createAppSlice } from '../../../createAppSlice';
import { FileSchema, ImageFile } from '../types/fileSchema';
import axios, { AxiosError, AxiosResponse } from 'axios';

const initialState: FileSchema = {
  file: null,
  status: 'idle',
  error: null,
  downloadImg: null,
};

export const fileSlice = createAppSlice({
  name: 'file',
  initialState,
  reducers: (create) => ({
    downloadImg: create.asyncThunk<string, string>(
      async (urlImg, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        return fetch(urlImg)
          .then((response) => {
            return response.blob();
          })
          .then((imageBlob) => {
            return URL.createObjectURL(imageBlob);
          })
          .catch((err) => {
            console.log('err download Img: ', err);
            return rejectWithValue({
              message: 'Ошибка в обработке запроса: ' + err.message,
              additionalMessage: (err.response as AxiosResponse)?.data.message,
              code: err.status || (err.response as AxiosResponse)?.data.statusCode,
            });
          });
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
          state.downloadImg = action.payload;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
    uploadFile: create.asyncThunk<ImageFile, FormData>(
      async (formData, thunkApi) => {
        const { dispatch, rejectWithValue } = thunkApi;

        try {
          const response = await axios.post<ImageFile>('https://6ede402e6a352dfb.mokky.dev' + `/uploads`, formData);
          if (!response.data) {
            throw new Error('Ошибка в обработке запроса, повторите попытку позже!');
          }
          await dispatch(uploadImg(response.data.url));

          return response.data;
        } catch (error) {
          console.log('error-uploadFile: ', error);
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
    deleteDatabaseImg: create.asyncThunk<AxiosError | void, number>(
      async (imageId, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
          await axios.delete('https://6ede402e6a352dfb.mokky.dev' + `/uploads/${imageId}`);
        } catch (error) {
          const err = error as AxiosError;
          return rejectWithValue({
            message: 'Ошибка при удалении аватар из базы данных: ' + err.message,
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
         // state.downloadImg = null;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
    deleteFile: create.asyncThunk<AxiosError | void, number>(
      async (imageId, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
          await axios.delete('https://6ede402e6a352dfb.mokky.dev' + `/uploads/${imageId}`);
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
          state.downloadImg = null;
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
    selectUploadUrlImg: (state) => state.downloadImg,
    selectFileError: (state) => state.error,
    selectStatusUploadFile: (state) => state.status,
  },
});

export const { deleteFile, uploadFile, downloadImg: uploadImg, deleteDatabaseImg } = fileSlice.actions;
export const { selectFile, selectStatusUploadFile, selectFileError, selectUploadUrlImg } = fileSlice.selectors;
