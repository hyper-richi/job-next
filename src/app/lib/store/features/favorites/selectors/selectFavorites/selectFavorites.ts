import { AppState } from '@/app/lib/store/store';

export const selectFavorites = (state: AppState) =>
  state.favorites.favorites.filter((item) => item.user_id === state.authProfile.authProfile?.id);
