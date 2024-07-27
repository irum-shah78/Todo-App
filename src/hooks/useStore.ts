// // app/hooks.ts
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '../store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// src/hooks/useAppSelector.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
