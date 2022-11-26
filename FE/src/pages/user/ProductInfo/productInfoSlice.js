import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: "",
    error: "",
    productDetail: {},
};

const fetchProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/products/product/${payload}`);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProductDetail.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.productDetail = action.payload;
        },
        [fetchProductDetail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default productDetailSlice;
export { fetchProductDetail };
