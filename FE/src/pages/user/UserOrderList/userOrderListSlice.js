import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: "",
    message: "",
    userOrderList: [],
};

const fetchUserOrderList = createAsyncThunk(
    "userOrderList/getUserOrderList",
    async (payload, { rejectWithValue }) => {
        try {
            if (payload.token) {
                const header = {
                    authorization: `Bearer ${payload.token}`,
                };
                const { data } = await axios.get("/orders/userOrderList", {
                    headers: header,
                });
                return data;
            } else {
                return rejectWithValue({ error: "inavlid token" });
            }
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchUserOrderListPaid = createAsyncThunk(
    "userOrderList/getUserOrderListPaid",
    async (payload, { rejectWithValue }) => {
        try {
            if (payload.token) {
                const header = {
                    authorization: `Bearer ${payload.token}`,
                };
                const { data } = await axios.get("/orders/userOrderListPaid", {
                    headers: header,
                });
                return data;
            } else {
                return rejectWithValue({ error: "inavlid token" });
            }
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchUserOrderListNotPay = createAsyncThunk(
    "userOrderList/getUserOrderListNotPay",
    async (payload, { rejectWithValue }) => {
        try {
            if (payload.token) {
                const header = {
                    authorization: `Bearer ${payload.token}`,
                };
                const { data } = await axios.get(
                    "/orders/userOrderListNotPay",
                    {
                        headers: header,
                    }
                );
                return data;
            } else {
                return rejectWithValue({ error: "inavlid token" });
            }
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchUserOrderListNotDelivery = createAsyncThunk(
    "userOrderList/getUserOrderListNotDelivery",
    async (payload, { rejectWithValue }) => {
        try {
            if (payload.token) {
                const header = {
                    authorization: `Bearer ${payload.token}`,
                };
                const { data } = await axios.get(
                    "/orders/userOrderListNotDelivery",
                    {
                        headers: header,
                    }
                );
                return data;
            } else {
                return rejectWithValue({ error: "inavlid token" });
            }
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchUserOrderListDelivered = createAsyncThunk(
    "userOrderList/getUserOrderListDelivered",
    async (payload, { rejectWithValue }) => {
        try {
            if (payload.token) {
                const header = {
                    authorization: `Bearer ${payload.token}`,
                };
                const { data } = await axios.get(
                    "/orders/userOrderListDelivered",
                    {
                        headers: header,
                    }
                );
                return data;
            } else {
                return rejectWithValue({ error: "inavlid token" });
            }
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchUserOrderCancel = createAsyncThunk(
    "userOrderList/userOrderCancel",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `/orders/orderCancel/${payload.orderId}`,
                {
                    isDeleted: payload.isDeleted,
                }
            );
            return data;
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const fetchUserOrderListCanceled = createAsyncThunk(
    "userOrderList/getUserOrderListCanceled",
    async (payload, { rejectWithValue }) => {
        try {
            if (payload.token) {
                const header = {
                    authorization: `Bearer ${payload.token}`,
                };
                const { data } = await axios.get(
                    "/orders/userIsDeletedOrderList",
                    {
                        headers: header,
                    }
                );
                return data;
            } else {
                return rejectWithValue({ error: "inavlid token" });
            }
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const userOrderListSlice = createSlice({
    name: "userOrderList",
    initialState,
    reducers: {
        clearMessage: (state, action) => {
            state.message = "";
        },
    },
    extraReducers: {
        [fetchUserOrderList.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderList.fulfilled]: (state, action) => {
            state.loading = false;
            state.userOrderList = action.payload;
        },
        [fetchUserOrderListPaid.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderListPaid.fulfilled]: (state, action) => {
            state.loading = false;
            state.userOrderList = action.payload;
        },
        [fetchUserOrderListNotPay.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderListNotPay.fulfilled]: (state, action) => {
            state.loading = false;
            state.userOrderList = action.payload;
        },
        [fetchUserOrderListNotDelivery.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderListNotDelivery.fulfilled]: (state, action) => {
            state.loading = false;
            state.userOrderList = action.payload;
        },
        [fetchUserOrderListDelivered.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderListDelivered.fulfilled]: (state, action) => {
            state.loading = false;
            state.userOrderList = action.payload;
        },
        [fetchUserOrderCancel.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderCancel.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchUserOrderListCanceled.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderListCanceled.fulfilled]: (state, action) => {
            state.loading = false;
            state.userOrderList = action.payload;
        },
    },
});

export default userOrderListSlice;
export {
    fetchUserOrderList,
    fetchUserOrderListPaid,
    fetchUserOrderListNotPay,
    fetchUserOrderListNotDelivery,
    fetchUserOrderListDelivered,
    fetchUserOrderCancel,
    fetchUserOrderListCanceled,
};
