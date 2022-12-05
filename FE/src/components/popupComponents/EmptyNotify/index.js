import React from "react";
import { Link } from "react-router-dom";
import style from "./emptyNotifyStyle.module.scss";
import emptyCartImg from "~/vendor/image/empty_cart.jpg";

export default function EmptyNotify(props) {
    return (
        <div className={style.empty_cart_container}>
            <img
                src={emptyCartImg}
                alt="empty cart"
                className={style.empty_cart_img}
            />
            <Link to="/" className={style.empty_cart_link}>
                {/* Giỏ hàng trống, ấn vào đây để mua hàng.{" "} */}
                {props.message}
            </Link>
        </div>
    );
}
