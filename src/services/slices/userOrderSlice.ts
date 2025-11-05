import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface IUserOrder {
  loading: boolean;
  error: string | null;
  orders: TOrder[];
}

const initialState: IUserOrder = {
  loading: false,
  error: null,
  orders: []
};

export const getUserOrder = createAsyncThunk('userOrder/get', getOrdersApi);

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(getUserOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orders = payload;
      });
  }
});

export const { getUserOrders } = userOrderSlice.selectors;

export default userOrderSlice.reducer;
