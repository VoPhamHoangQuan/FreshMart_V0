import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const initialState = {
    productList: [],
    categoryMeatFilter: "pork,chicken,fish,sea food,egg",
    categoryVegetableFilter: "vegetable,root vegetable,fruit",
    error: "",
    loading: "",
    productListBySearch: [],
};

const fetchProductList = createAsyncThunk(
    "homeUser/fetchProductList",

    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/products");
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchProductListBySearch = createAsyncThunk(
    "homeUser/fetchProductListBySearch",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/products/search/${payload.key}`);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const homeUserSlice = createSlice({
    name: "homeUser",
    initialState,
    reducers: {
        setCategoryMeatFilter: (state, action) => {
            state.categoryMeatFilter = action.payload;
        },
        setCategoryVegetableFilter: (state, action) => {
            state.categoryVegetableFilter = action.payload;
        },
    },
    extraReducers: {
        [fetchProductList.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductList.fulfilled]: (state, action) => {
            state.loading = false;
            if (state.productList.length !== 0) {
                const unitedProductList = action.payload.filter(
                    (el, index) => el._id === state.productList[index]._id
                );
                state.productList = unitedProductList;
                state.productListBySearch = [];
            } else {
                state.productList.push(...action.payload);
                state.productListBySearch = [];
            }
        },
        [fetchProductList.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchProductListBySearch.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductListBySearch.fulfilled]: (state, action) => {
            state.loading = false;
            state.productListBySearch = action.payload;
            state.productList = [];
        },
    },
});

export default homeUserSlice;
export { fetchProductList, fetchProductListBySearch };
