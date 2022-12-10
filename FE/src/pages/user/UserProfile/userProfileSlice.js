import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: "",
    message: "",
};

const fetchUpdateUser = createAsyncThunk(
    "userProfile/updateUser",
    async (payload, { rejectWithValue }) => {
        try {
            const header = {
                authorization: `Bearer ${payload.token}`,
            };
            const { data } = await axios.post(
                "/users/updateUser",
                {
                    name: payload.name,
                    gender: payload.gender,
                    imageUrl: payload.imageUrl,
                },
                {
                    headers: header,
                }
            );
            const newUser = {
                name: payload.name,
                gender: payload.gender,
                phone: payload.phone,
                image: payload.imageUrl,
                isAdmin: payload.isAdmin,
                isDelete: payload.isDelete,
                token: payload.token,
            };

            return newUser;
        } catch (err) {
            return rejectWithValue({ error: err.message });
        }
    }
);

const UserProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUpdateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUpdateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        [fetchUpdateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default UserProfileSlice;
export { fetchUpdateUser };
