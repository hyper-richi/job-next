import { createAppSlice } from '../../../createAppSlice';
import axios from 'axios';
import { User, authProfileSchema } from '../types/usersSchema';

const initialState: authProfileSchema = {
  status: 'none',
  error: null,
  users: null,
};

export const usersSlice = createAppSlice({
  name: 'users',
  initialState,
  reducers: (create) => ({
    fetchAllUsers: create.asyncThunk<User[], void>(
      async (_, thunkApi) => {
        return await axios
          .get<User[]>('https://6ede402e6a352dfb.mokky.dev' + `/users`)
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return thunkApi.rejectWithValue(`Ошибка авторизации: ${error} `);
            //return error;
          });
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.status = 'none';
          state.users = action.payload;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
  }),
  selectors: {
    selectAllUsers: (state) => state.users,
    selectStatusAllUsers: (state) => state.status,
  },
});

export const { fetchAllUsers } = usersSlice.actions;
export const { selectAllUsers, selectStatusAllUsers } = usersSlice.selectors;
