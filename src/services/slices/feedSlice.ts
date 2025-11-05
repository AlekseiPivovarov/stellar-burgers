import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

interface IFeedState {
  loading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: IFeedState = {
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const getFeed = createAsyncThunk('feedInfo/getFeed', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feedInfo',
  initialState,
  reducers: {},
  selectors: {
    getFeedInfo: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      });
  }
});

export const { getFeedInfo } = feedSlice.selectors;

export default feedSlice.reducer;
