import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';



type PizzaItem ={
  id: string,
  item: any;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCUSS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParrams = {
   categoryId: any;
   sortCategory: string;
   searchValue: string;
   currentPage: string;
  }

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParrams>('pizza/fetchPizzasStatus', async (params) => {
  const { categoryId, sortCategory, searchValue, currentPage } = params;
  const {data} = await axios.get<PizzaItem[]>(
    `https://638624f5beaa64582674707b.mockapi.io/PizzaBlock?page=${currentPage}&limit=4
    &${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortCategory.replace(
      '-',
      '',
    )}&order=${sortCategory.includes('-') ? 'asc' : 'desc'}${
      searchValue ? `&search=${searchValue}` : ''
    }`,
  );
  return data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
  
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCUSS;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }

});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
