import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './features/counter/counterSlice';
import { StateSchema } from '../provider/StateSchema';
import { loginFormReducer } from './features/auth/slice/loginFormSlice';
import { userReducer } from './features/user/slice/userSlice';

// const rootReducer = combineSlices(counterSlice, quotesApiSlice);

export const makeStore = () => {
  return configureStore<StateSchema>({
    reducer: {
      counter: counterReducer,
      user: userReducer,
      loginForm: loginFormReducer,
      // auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
