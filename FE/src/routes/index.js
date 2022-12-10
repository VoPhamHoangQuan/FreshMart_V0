import { HeaderOnly, ProfileLayout } from "../components/layouts";
import HomeUser from "../pages/user/HomeUser";
import ProductInfo from "../pages/user/ProductInfo";
import CartInfo from "../pages/user/CartInfo";
import Signin from "../pages/user/authentication/Signin";
import SigninOtp from "../pages/user/authentication/SigninOtp";
import SigninInfo from "../pages/user/authentication/SigninInfo";
import PassEntering from "../pages/user/authentication/SigninPass";
import ShippingInfo from "../pages/user/ShippingInfo";
import ShippingConfirm from "../pages/user/ShippingConfirm";
import OrderInfo from "../pages/user/OrderInfo";
import UserOrderList from "../pages/user/UserOrderList";
import UserProfile from "../pages/user/UserProfile";

export const PublicRoutes = [
    { path: "/", component: HomeUser },
    { path: "/product/:id", component: ProductInfo, layout: HeaderOnly },
    { path: "/cart", component: CartInfo, layout: HeaderOnly },
    { path: "/cart/:id", component: CartInfo, layout: HeaderOnly },
    { path: "/signin", component: Signin, layout: HeaderOnly },
    {
        path: "/signin/otpAuth",
        component: SigninOtp,
        layout: HeaderOnly,
    },
    {
        path: "/signin/otpAuth/phoneSigninInfo",
        component: SigninInfo,
        layout: HeaderOnly,
    },
    {
        path: "/signin/otpAuth/passEntering",
        component: PassEntering,
        layout: HeaderOnly,
    },
    // { path: "/signin/socialSigninInfo", component: SigninOtp, layout: HeaderOnly },
];

export const PrivateRoutes = [
    {
        path: "/shippingInfo",
        component: ShippingInfo,
        layout: HeaderOnly,
    },
    {
        path: "/shippingConfirm",
        component: ShippingConfirm,
        layout: HeaderOnly,
    },
    {
        path: "/orderInfo/:orderId",
        component: OrderInfo,
        layout: HeaderOnly,
    },
    {
        path: "/user/orderList",
        component: UserOrderList,
        layout: ProfileLayout,
    },
    {
        path: "/user/userProfile",
        component: UserProfile,
        layout: ProfileLayout,
    },
];
