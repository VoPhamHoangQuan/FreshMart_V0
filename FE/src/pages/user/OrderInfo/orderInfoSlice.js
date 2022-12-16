import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: "",
    message: "",
    order: {},
    VNDRate: "",
};

const fetchOrderDetail = createAsyncThunk(
    "orderInfo/getOrderDetail",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `/orders/order/${payload.orderId}`
            );
            return data;
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchVNDRate = createAsyncThunk(
    "orderInfo/getVNDRate",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "https://api.currencyfreaks.com/latest?apikey=dac1a827e05b45fa85977bac4a3b5e81&symbols=VND"
            );
            const result = parseInt(data.rates.VND).toFixed(0);
            return result;
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchModifyIsPaidOrder = createAsyncThunk(
    "orderInfo/mondifyIsPaidOrder",
    async (payload, { rejectWithValue }) => {
        try {
            const orderId = payload.orderId;
            const isPaid = payload.isPaid;
            const paidAt = payload.paidAt;
            const { data } = await axios.post(`/orders/order/${orderId}`, {
                isPaid,
                paidAt,
            });
            return data;
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const orderInfoSlice = createSlice({
    name: "orderInfo",
    initialState,
    reducers: {
        clearMessage: (state, action) => {
            state.message = "";
        },
    },
    extraReducers: {
        [fetchOrderDetail.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchOrderDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        [fetchVNDRate.fulfilled]: (state, action) => {
            state.VNDRate = action.payload;
        },
        [fetchModifyIsPaidOrder.fulfilled]: (state, action) => {
            state.message = action.payload;
        },
    },
});

export default orderInfoSlice;
export { fetchOrderDetail, fetchVNDRate, fetchModifyIsPaidOrder };
