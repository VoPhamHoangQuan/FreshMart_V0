import { configureStore } from "@reduxjs/toolkit";

import homeUserSlice from "../pages/user/HomeUser/homeUserSlide";
import productInfoSlice from "../pages/user/ProductInfo/productInfoSlice";
import cartInfoSlice from "../pages/user/CartInfo/cartInfoSlice";
import signinSlice from "../pages/user/authentication/signinSlice";
import shippingInfoSlice from "../pages/user/ShippingInfo/shippingInfoSlice";
import shippingConfirmSlice from "../pages/user/ShippingConfirm/shippingConfirmSlice";
import orderInfoSlice from "../pages/user/OrderInfo/orderInfoSlice";
import userOrderListSlice from "../pages/user/UserOrderList/userOrderListSlice";
import UserProfileSlice from "~/pages/user/UserProfile/userProfileSlice";

const store = configureStore({
    reducer: {
        homeUser: homeUserSlice.reducer,
        productInfo: productInfoSlice.reducer,
        cartInfo: cartInfoSlice.reducer,
        signin: signinSlice.reducer,
        shippingInfo: shippingInfoSlice.reducer,
        shippingConfirm: shippingConfirmSlice.reducer,
        orderInfo: orderInfoSlice.reducer,
        userOrderInfo: userOrderListSlice.reducer,
        UserProfile: UserProfileSlice.reducer,
    },
});

export default store;
