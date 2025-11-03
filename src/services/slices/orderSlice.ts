import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrderState {
  loading: boolean;
  orderInfo: TOrder | null;
  error: string | null;
}

const initialState: IOrderState = {
  loading: false,
  orderInfo: null,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'orderInfo/getOrder',
  (number: number) => getOrderByNumberApi(number)
);

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    getOrderInfo: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orderInfo = payload.orders[0];
      });
  }
});

export const { getOrderInfo } = orderInfoSlice.selectors;

export default orderInfoSlice.reducer;
