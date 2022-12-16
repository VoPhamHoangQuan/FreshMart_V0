import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import axios from "axios";

const initialState = {
    loading: "",
    error: "",
    message: "",
    cartItems: [],
};

const addToCart = createAsyncThunk(
    "/addToCart",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `/products/product/${payload.productId}`
            );
            return {
                productId: data._id,
                name: data.name,
                image: data.image,
                primaryPrice: data.primaryPrice,
                qty: payload.buyQty,
                stock: data.stock,
            };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const cartInfoSlice = createSlice({
    name: "cartInfo",
    initialState,
    reducers: {
        modifyCart: (state, action) => {
            state.cartItems = JSON.parse(localStorage.getItem("cartItems"));
            state.cartItems = state.cartItems.map((el) =>
                el.productId === action.payload.productId
                    ? { ...el, qty: action.payload.buyQty }
                    : el
            );
            localStorage["cartItems"] = JSON.stringify(state.cartItems);
        },

        removeFromCart: (state, action) => {
            state.cartItems = JSON.parse(localStorage.getItem("cartItems"));
            state.cartItems = state.cartItems.filter(
                (el) => el.productId !== action.payload.productId
            );
            localStorage["cartItems"] = JSON.stringify(state.cartItems);
        },

        clearCart: (state, action) => {
            state.cartItems = [];
        },
        clearMessage: (state, action) => {
            state.message = "";
        },
    },
    extraReducers: {
        [addToCart.pending]: (state, action) => {
            state.loading = true;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
            const cartList = JSON.parse(JSON.stringify(state.cartItems));
            const existedItem = cartList.find(
                (el) => el.productId === action.payload.productId
            );
            if (existedItem) {
                state.cartItems = state.cartItems.map((el) =>
                    el.productId === action.payload.productId
                        ? action.payload
                        : el
                );
            } else {
                state.cartItems.push(action.payload);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            state.message = "addToCartSuccess";
        },
        [addToCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default cartInfoSlice;
export { addToCart };
