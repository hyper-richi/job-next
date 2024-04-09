import { AppState } from '@/app/lib/store/store';

export const selectFavorites = (state: AppState) =>
  state.favorites.favorites.filter((item) => item.userId === state.authUser.authUser?.id);
