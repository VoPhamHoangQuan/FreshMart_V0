import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    message: "",
    error: "",
};

const fetchComparePassword = createAsyncThunk(
    "changePassword/comparePassword",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_LOCATE}/users/comparePassword`,
                {
                    phone: payload.phone,
                    password: payload.password,
                }
            );
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchUpdatePassUser = createAsyncThunk(
    "changePassword/updatePassUser",
    async (payload, { rejectWithValue }) => {
        try {
            const header = {
                authorization: `Bearer ${payload.token}`,
            };
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_LOCATE}/users/updatePassUser`,
                {
                    password: payload.password,
                },
                {
                    headers: header,
                }
            );
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const changePasswordSlice = createSlice({
    name: "changePassword",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchComparePassword.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchComparePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchComparePassword.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchUpdatePassUser.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUpdatePassUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        [fetchUpdatePassUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export default changePasswordSlice;
export { fetchComparePassword, fetchUpdatePassUser };
