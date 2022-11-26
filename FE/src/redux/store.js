import { configureStore } from "@reduxjs/toolkit";

import homeUserSlice from "../pages/user/HomeUser/homeUserSlide";
import productInfoSlice from "../pages/user/ProductInfo/productInfoSlice";
import cartInfoSlice from "../pages/user/CartInfo/cartInfoSlice";
import signinSlice from "../pages/user/authentication/signinSlice";
import shippingInfoSlice from "../pages/user/ShippingInfo/shippingInfoSlice";

const store = configureStore({
    reducer: {
        homeUser: homeUserSlice.reducer,
        productInfo: productInfoSlice.reducer,
        cartInfo: cartInfoSlice.reducer,
        signin: signinSlice.reducer,
        shippingInfo: shippingInfoSlice.reducer,
    },
});

export default store;
