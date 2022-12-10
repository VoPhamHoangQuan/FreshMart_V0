import React, { useEffect, useState } from "react";
import style from "./userOrderStyle.module.scss";
import { numberWithCommas } from "~/vendor/js";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
export default function UserOrder({ orderItem }) {
    const history = useNavigate();
    const [isPaid, setIsPaid] = useState(false);
    const [paidAt, setPaidAt] = useState(null);
    const [isDelivered, setIsDelivered] = useState(false);
    const [deliveriedAt, setDeliveredAt] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [orderTotalPrice, setOrderTotalPrice] = useState(0);

    function handleOrderDetail() {
        history(`/orderInfo/${orderItem._id}`);
    }

    useEffect(() => {
        orderItem.isPaid === true ? setIsPaid(true) : setIsPaid(false);
        orderItem.paidAt
            ? setPaidAt(new Date(orderItem.paidAt).toLocaleString())
            : setPaidAt(null);
        orderItem.isDelivered === true
            ? setIsDelivered(true)
            : setIsDelivered(false);
        orderItem.deliveredAt
            ? setDeliveredAt(new Date(orderItem.deliveredAt).toLocaleString())
            : setDeliveredAt(null);
        orderItem.orderItems
            ? setCartItems(orderItem.orderItems)
            : setCartItems([]);
        orderItem.shippingInfo
            ? setOrderTotalPrice(
                  orderItem.shippingInfo.shippingPrice +
                      orderItem.shippingInfo.itemsPrice
              )
            : setOrderTotalPrice(null);
    }, []);
    return (
        <div className={style.container}>
            <div className={style.header_container}>
                <div
                    className={clsx(style.payment_container, {
                        [style.payment_container__inActive]: !isPaid,
                    })}
                >
                    <i className="fa-solid fa-money-check-dollar"></i>{" "}
                    <span className={style.status}>
                        {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}{" "}
                    </span>
                    <span className={style.time}>{paidAt ? paidAt : ""}</span>
                </div>
                <div
                    className={clsx(style.shipping_container, {
                        [style.shipping_container__inActive]: !isDelivered,
                    })}
                >
                    <i className="fa-solid fa-truck-fast"></i>
                    <span className={style.status}>
                        {isDelivered ? "Đã nhận hàng" : "Đang vận chuyển"}{" "}
                    </span>
                    <span className={style.time}>
                        {deliveriedAt ? deliveriedAt : ""}
                    </span>
                </div>
            </div>
            <div className={style.body_container}>
                {cartItems.map((el, id) => (
                    <div key={id} className={style.item_container}>
                        <div className={style.productInfo_container}>
                            <img src={el.productId.image} alt="product"></img>
                            <div className={style.detail_container}>
                                <span className={style.name}>
                                    {el.productId.name}
                                </span>
                                <span className={style.price}>
                                    {" "}
                                    {numberWithCommas(
                                        el.productId.primaryPrice
                                    )}
                                    <span>đ</span>
                                </span>
                                <span className={style.quantity}>
                                    x{el.qty}
                                </span>
                            </div>
                        </div>
                        <div className={style.productTotalPrice_container}>
                            <span>
                                {numberWithCommas(
                                    el.qty * el.productId.primaryPrice
                                )}
                            </span>
                            <span>đ</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.footer_container}>
                <div className={style.totalPrice_container}>
                    <i className="fa-solid fa-sack-dollar"></i>
                    <span>Tổng số tiền: </span>
                    <span>{numberWithCommas(orderTotalPrice)}</span>
                    <span>đ</span>
                </div>
                <div className={style.controlBtns_container}>
                    <div className={style.controlBtn}>
                        <button className="primary_btn_style_1">Mua lại</button>
                    </div>
                    <div
                        className={style.controlBtn}
                        onClick={handleOrderDetail}
                    >
                        <button className="primary_btn_style_2">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
