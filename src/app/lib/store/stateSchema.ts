import { rtkApi } from '../api/rtkApi';
import { AuthUserSchema } from './features/auth/types/authUserSchema';
import { FavoritesSchema } from './features/favorites/types/favoritesSchema';
import { FileSchema } from './features/file/types/fileSchema';
import { AxiosInstance } from 'axios';

export interface StateSchema {
  authUser: AuthUserSchema;
  file: FileSchema;
  favorites: FavoritesSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
