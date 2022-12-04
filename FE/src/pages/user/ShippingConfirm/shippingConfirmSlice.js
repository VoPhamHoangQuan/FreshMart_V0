import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: "",
    message: "",
    createdOrder: {},
};

const fetchCreateOrder = createAsyncThunk(
    "shippingConfirm/createOrder",
    async (payload, { rejectWithValue }) => {
        try {
            const header = {
                authorization: `Bearer ${payload.token}`,
            };

            const body = {
                orderItems: payload.orderItems,
                shippingInfo: payload.shippingInfo,
                paymentMethod: payload.paymentMethod,
            };

            const { data } = await axios.post("/orders/", body, {
                headers: header,
            });

            localStorage.setItem("cartItems", JSON.stringify([]));

            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchUpdateProductStock = createAsyncThunk(
    "shippingConfirm/updateProductStock",
    async (payload, { rejectWithValue }) => {
        try {
            payload.updateItems.map(async (el) => {
                const body = {
                    productId: el.productId,
                    updatedStock: el.stock - el.qty,
                };
                await axios.post("/products/adjustProducIntStock", body);
            });
            return "update product stock success";
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const shippingConfirmSlice = createSlice({
    name: "shippingConfirm",
    initialState,
    reducers: {
        clearCreatedOrder: (state, action) => {
            state.createdOrder = {};
        },
    },
    extraReducers: {
        [fetchCreateOrder.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCreateOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.createdOrder = action.payload;
        },
        [fetchUpdateProductStock.pending]: (state, action) => {
            state.loading = true;
            state.message = action.payload;
        },
        [fetchUpdateProductStock.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default shippingConfirmSlice;
export { fetchCreateOrder, fetchUpdateProductStock };
