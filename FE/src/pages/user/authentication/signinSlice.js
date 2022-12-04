import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "~/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";

const initialState = {
    phoneNumber: "",
    error: "",
    loading: false,
    existedPhone: {},
    userInfo: {},
};

const fetchExistedPhone = createAsyncThunk(
    "signin/existedPhone",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/users/existedPhone", {
                phone: payload,
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchSigninUser = createAsyncThunk(
    "signin/signinUser",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/users/signin", {
                phone: payload.phone,
                password: payload.password,
            });
            if (!data.error) {
                localStorage.setItem("userInfo", JSON.stringify(data));
            }

            return data;
        } catch (err) {
            return rejectWithValue("Mật khẩu không đúng");
        }
    }
);

const fetchCreateUser = createAsyncThunk(
    "signin/createUser",
    async (payload, { rejectWithValue }) => {
        try {
            const { newUser } = await axios.post("/users/createUser", {
                name: payload.name,
                gender: payload.gender,
                password: payload.password,
                phone: payload.phone,
                isAdmin: false,
            });
            return newUser;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        phoneGenerator: (state, action) => {
            state.phoneNumber = action.payload;
        },
        refreshError: (state, action) => {
            state.error = "";
        },
        signOut: (state, action) => {
            state.phoneNumber = "";
            state.error = "";
            state.existedPhone = {};
            state.userInfo = {};
            localStorage.removeItem("cartItems");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("shippingInfo");
        },
    },
    extraReducers: {
        [fetchExistedPhone.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchExistedPhone.fulfilled]: (state, action) => {
            state.loading = false;
            state.existedPhone = action.payload;
        },
        [fetchExistedPhone.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchSigninUser.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchSigninUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        [fetchSigninUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchCreateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCreateUser.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [fetchCreateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default signinSlice;
export { fetchExistedPhone, fetchSigninUser, fetchCreateUser };
