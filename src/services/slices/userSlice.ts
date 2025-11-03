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

interface IUser {
  loading: boolean;
  user: TUser | null;
  authorization: boolean;
  error: string | null;
  // orders: TOrder[];
}

const initialState: IUser = {
  loading: false,
  user: null,
  authorization: false,
  error: null
  // orders: []
};

// export const getUserOrder = createAsyncThunk('user/orders', getOrdersApi);

export const getUser = createAsyncThunk('user/get', getUserApi);

export const loginUser = createAsyncThunk('user/login', (login: TLoginData) =>
  loginUserApi(login)
);

export const registerUser = createAsyncThunk(
  'user/register',
  (data: TRegisterData) => registerUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const updateUser = createAsyncThunk(
  'user/update',
  (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const forgotPasswor = createAsyncThunk(
  'user/frogotPassword',
  (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => state,
    getAuthorization: (state) => state.authorization
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.authorization = true;
        state.user = payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
        state.authorization = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
        state.authorization = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.authorization = false;
        // state.orders = [];
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
        state.authorization = true;
      })
      .addCase(forgotPasswor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswor.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(forgotPasswor.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
    // .addCase(getUserOrder.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(getUserOrder.rejected, (state, { error }) => {
    //   state.loading = false;
    //   state.error = error.message as string;
    // })
    // .addCase(getUserOrder.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.orders = payload;
    // });
  }
});

export const { getUserState, getAuthorization } = userSlice.selectors;

export default userSlice.reducer;
