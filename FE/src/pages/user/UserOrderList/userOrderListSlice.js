import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: "",
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

const userOrderListSlice = createSlice({
    name: "userOrderList",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserOrderList.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserOrderList.fulfilled]: (state, action) => {
            state.loading = false;
            state.userOrderList = action.payload;
        },
    },
});

export default userOrderListSlice;
export { fetchUserOrderList };
