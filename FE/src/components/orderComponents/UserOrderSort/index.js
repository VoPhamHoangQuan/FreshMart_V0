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
                Tất cả
            </button>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderNotPayClick()}
            >
                Chưa thanh toán
            </button>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderPaidClick()}
            >
                Đã thanh toán
            </button>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderNotDeliveryClick()}
            >
                Đang vận chuyển
            </button>
            <button
                className={style.controler_contain}
                onClick={() => handleOrderDeliveredClick()}
            >
                Đã Nhận hàng
            </button>
        </div>
    );
}
