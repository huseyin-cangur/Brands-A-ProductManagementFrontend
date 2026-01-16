import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../model/IProduct";
 

interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.products.findIndex(
        (c) => c.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (c) => c.id?.toString() !== action.payload.toString()
      );

       
    },
  },
});

export const { setProduct, addProduct, deleteProduct,updateProduct } =
  productSlice.actions;
