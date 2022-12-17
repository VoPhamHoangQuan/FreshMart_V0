import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./autoPopUpNotify.module.scss";
import cartInfoSlice from "~/pages/user/CartInfo/cartInfoSlice";
import orderInfoSlice from "~/pages/user/OrderInfo/orderInfoSlice";
import userOrderListSlice from "~/pages/user/UserOrderList/userOrderListSlice";

import checkImage from "~/vendor/image/checked.png";

export default function AutoPopUpNotify(props) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timers = setTimeout(() => {
            dispatch(cartInfoSlice.actions.clearMessage());
            dispatch(orderInfoSlice.actions.clearMessage());
            dispatch(userOrderListSlice.actions.clearMessage());
            setShow(true);
        }, "2000");
        return () => {
            clearTimeout(timers);
        };
    }, [show]);
    return (
        <div
            id="autoPopupNotify"
            className={clsx(style.container, {
                [style.container__inActive]: show,
            })}
        >
            <div className={style.image_container}>
                <img src={checkImage} alt="check"></img>
            </div>
            <div className={style.notify_container}>
                <span className={style.title}>Thông báo</span>
                <span className={style.content}>{props.message}</span>
            </div>
        </div>
    );
}
