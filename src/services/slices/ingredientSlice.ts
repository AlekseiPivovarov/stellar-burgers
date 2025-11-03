import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  ingredients: TIngredient[];
};

const initialState: TIngredientState = {
  ingredients: []
};

export const getAllIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        state.ingredients = [];
      })
      .addCase(getAllIngredients.rejected, (state) => {})
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredients } = ingredientsSlice.selectors;
