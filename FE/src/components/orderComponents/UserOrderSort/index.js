import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import style from "./userOrderSortStyle.module.scss";
import {
    fetchUserOrderList,
    fetchUserOrderListPaid,
    fetchUserOrderListNotPay,
    fetchUserOrderListNotDelivery,
    fetchUserOrderListDelivered,
    fetchUserOrderListCanceled,
} from "~/pages/user/UserOrderList/userOrderListSlice.js";

export default function UserOrderSort({ userInfo }) {
    const focus = useRef();
    const dispatch = useDispatch();
    const token = userInfo.token;
    function handleOrderClick() {
        dispatch(fetchUserOrderList({ token: token }));
    }
    function handleOrderNotPayClick() {
        dispatch(fetchUserOrderListNotPay({ token: token }));
    }
    function handleOrderPaidClick() {
        dispatch(fetchUserOrderListPaid({ token: token }));
    }
    function handleOrderNotDeliveryClick() {
        dispatch(fetchUserOrderListNotDelivery({ token: token }));
    }
    function handleOrderDeliveredClick() {
        dispatch(fetchUserOrderListDelivered({ token: token }));
    }
    function handleOrderCanceledClick() {
        dispatch(fetchUserOrderListCanceled({ token: token }));
    }

    useEffect(() => {
        focus.current.focus();
    }, []);
    return (
        <div className={clsx("row mt-1", style.container)}>
            <button
                ref={focus}
                className={style.controler_contain}
                onClick={() => handleOrderClick()}
            >
                Tất Cả
            </button>
            <i></i>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderNotPayClick()}
            >
                Chưa Thanh Toán
            </button>
            <i></i>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderPaidClick()}
            >
                Đã Thanh Toán
            </button>
            <i></i>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderNotDeliveryClick()}
            >
                Đang Vận Chuyển
            </button>
            <i></i>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderDeliveredClick()}
            >
                Đã Nhận Hàng
            </button>
            <i></i>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderCanceledClick()}
            >
                Đã Hủy
            </button>
        </div>
    );
}
