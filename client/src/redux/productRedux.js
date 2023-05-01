import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../utils/requestMethods";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  try {
    const response = await publicRequest.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
  // const response = await publicRequest.get(`${API_BASE_URL}/products`);
  // return response.data;
});

export const saveProduct = createAsyncThunk("products/saveProduct", async ({ title, categories, price }) => {
  try {
    const response = await userRequest.post(`${API_BASE_URL}/products/add`, {
      title,
      categories,
      price,
    });
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, title, categories, price }) => {
  try {
    const response = await userRequest.patch(`${API_BASE_URL}/products/${id}`, {
      id,
      title,
      categories,
      price,
    });
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (_id) => {
  try {
    await userRequest.delete(`${API_BASE_URL}/products/${_id}`);
    return _id;
  } catch (err) {
    console.error(err.message);
  }
});

const productEntity = createEntityAdapter({
  selectId: (product) => product._id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        productEntity.setAll(state, action.payload);
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        productEntity.addOne(state, action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        productEntity.removeOne(state, action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productEntity.updateOne(state, { id: action.payload._id, updates: action.payload });
      });
  },
});

export const productSelectors = productEntity.getSelectors((state) => state.product);
export default productSlice.reducer;
