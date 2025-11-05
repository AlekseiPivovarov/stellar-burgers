import { orderBurgerApi } from '@api';
import { BurgerConstructor } from '@components';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface IConstructorState {
  loading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: IConstructorState = {
  loading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const sendOrder = createAsyncThunk(
  'constructorbg/sendOrder',
  (data: string[]) => orderBurgerApi(data)
);

export const burgerConstructorSlice = createSlice({
  name: 'constructorbg',
  initialState,
  selectors: {
    getConstructorItem: (state) => state
  },
  reducers: {
    // addIngredient: (state, action) => {
    //   if (action.payload.type === 'bun') {
    //     state.constructorItems.bun = action.payload;
    //   } else {
    //     state.constructorItems.ingredients.push({
    //       id: nanoid(),
    //       ...action.payload
    //     });
    //   }
    // },
    addIngredient: {
      reducer: (state, action) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.constructorItems.bun = item;
        } else {
          state.constructorItems.ingredients.push(item);
        }
      },
      prepare: (item: TIngredient) => {
        const isBun = item.type === 'bun';
        return {
          payload: isBun ? item : { ...item, id: nanoid() },
          meta: {},
          error: undefined
        };
      }
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != action.payload
        );
    },
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    setNullOrderModalData: (state) => {
      state.orderModalData = null;
    },
    moveIngredientDown: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    moveIngredientUp: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(sendOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setNullOrderModalData,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;

export const { getConstructorItem } = burgerConstructorSlice.selectors;
