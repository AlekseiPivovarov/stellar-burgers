import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { ingredientsSlice } from './slices/ingredientSlice';
import { feedSlice } from './slices/feedSlice';
import { orderInfoSlice } from './slices/orderSlice';
import { userSlice } from './slices/userSlice';

const rootReducer = combineReducers({
  constructorbg: burgerConstructorSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  feedInfo: feedSlice.reducer,
  orderInfo: orderInfoSlice.reducer,
  user: userSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
