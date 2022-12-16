import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: "",
    error: "",
    message: "",
    productDetail: {},
    commentList: [],
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
const fetchCreateInitComment = createAsyncThunk(
    "productDetail/createInitComment",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/comments/init", {
                productId: payload.productId,
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchAddComment = createAsyncThunk(
    "productDetail/createComment",
    async (payload, { rejectWithValue }) => {
        try {
            const header = { authorization: `Bearer ${payload.token}` };
            const body = {
                productId: payload.productId,
                message: payload.message,
                rate: payload.rate,
            };
            const { data } = await axios.post("/comments/addComment", body, {
                headers: header,
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {
        clearMessage: (state, action) => {
            state.message = "";
        },
    },
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
        [fetchCreateInitComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchAddComment.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAddComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchAddComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default productDetailSlice;
export { fetchProductDetail, fetchCreateInitComment, fetchAddComment };
