import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, AppState } from './store';

// Используйте во всем приложении вместо простых `useDispatch` и `useSelector`.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<AppStore>();
