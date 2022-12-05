import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./ShippingDetailsConfirm.module.scss";
import {
    numberWithCommas,
    formatPhoneNumber,
    reverseFormatPhoneNumber,
} from "~/vendor/js";
import shippingConfirmSlice, {
    fetchCreateOrder,
    fetchUpdateProductStock,
} from "~/pages/user/ShippingConfirm/shippingConfirmSlice";
import cartInfoSlice from "~/pages/user/CartInfo/cartInfoSlice";
import PopUpNotify from "~/components/popupComponents/PopUpNotify";

export default function ShippingDetailsConfirm() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const { createdOrder } = useSelector((state) => state.shippingConfirm);
    const [submitState, setSubmitState] = useState(false);

    function forceAuthentication(shippingInfo, userInfo, cartItems) {
        if (!userInfo) {
            history("/signin");
        } else if (!shippingInfo || !cartItems) {
            history("/shippingInfo");
        }
    }

    function handleSubmitClick() {
        const orderItems = cartItems.map((el) => {
            return { productId: el.productId, qty: el.qty };
        });
        const shippingInfomation = {
            address: shippingInfo.shippingAddress,
            shippingPhone:
                shippingInfo.shippingPhone.length < 4
                    ? ""
                    : shippingInfo.shippingPhone,
            shippingPrice: shippingInfo.shippingPrice,
            itemsPrice: shippingInfo.productPrice,
        };
        const updateItems = cartItems.map((el) => {
            return {
                productId: el.productId,
                qty: el.qty,
                stock: el.stock,
            };
        });
        dispatch(
            fetchUpdateProductStock({
                updateItems: updateItems,
            })
        );
        dispatch(
            fetchCreateOrder({
                token: userInfo.token,
                orderItems,
                shippingInfo: shippingInfomation,
                paymentMethod: shippingInfo.paymentMethod,
            })
        );
        dispatch(cartInfoSlice.actions.clearCart());
        // setSubmitState(!submitState);
    }

    useEffect(() => {
        if (createdOrder.newOrder) {
            const orderId = createdOrder.newOrder._id;
            history(`/orderInfo/${orderId}`, { replace: true });
        }
    }, [createdOrder.newOrder]);

    useEffect(() => {
        forceAuthentication(shippingInfo, userInfo, cartItems);
    }, []);
    return (
        <div className="row mt-1">
            <div className="col_lg_6_12">
                <div className={style.container}>
                    <div className={style.block_container}>
                        <div
                            className={clsx(
                                style.detail_container,
                                style.detail_container__title
                            )}
                        >
                            <span>
                                <i
                                    style={{ marginRight: "0.6rem" }}
                                    className="fa-solid fa-truck-fast"
                                ></i>
                                Thông tin liên lạc vận chuyển
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>Người đặt hàng:</span>
                            <span className={style.content}>
                                {shippingInfo.customerGender === "male"
                                    ? "Anh"
                                    : "Chị"}{" "}
                                {shippingInfo.customerName}
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>Số điện thoại:</span>
                            <span className={style.content}>
                                {shippingInfo.shippingPhone.length < 4
                                    ? `${reverseFormatPhoneNumber(
                                          shippingInfo.customerPhone
                                      )}`
                                    : `${reverseFormatPhoneNumber(
                                          shippingInfo.shippingPhone
                                      )}  -  ${reverseFormatPhoneNumber(
                                          shippingInfo.customerPhone
                                      )}`}
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>
                                Địa chỉ giao hàng:
                            </span>
                            <span className={style.content}>
                                {shippingInfo.shippingAddress}
                            </span>
                        </div>
                    </div>
                    <div className={style.block_container}>
                        <div
                            className={clsx(
                                style.detail_container,
                                style.detail_container__title
                            )}
                        >
                            <span>
                                <i
                                    style={{ marginRight: "0.6rem" }}
                                    className="fa-regular fa-credit-card"
                                ></i>
                                Phương thức thanh toán
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>Phương thức:</span>
                            <span className={style.content}>
                                {shippingInfo.paymentMethod === "cash"
                                    ? "Tiền mặt khi nhận hàng"
                                    : shippingInfo.paymentMethod}
                            </span>
                        </div>
                    </div>
                    <div className={style.block_container}>
                        <div
                            className={clsx(
                                style.detail_container,
                                style.detail_container__title
                            )}
                        >
                            <span>
                                <i
                                    style={{ marginRight: "0.6rem" }}
                                    className="fa-solid fa-bag-shopping"
                                ></i>
                                Giỏ hàng
                            </span>
                        </div>
                        <div className={style.cart_container}>
                            {cartItems.length > 0 ? (
                                cartItems.map((el, id) => (
                                    <div
                                        className={style.product_container}
                                        key={id}
                                    >
                                        <div className={style.product_detail}>
                                            <img
                                                className={style.image}
                                                src={el.image}
                                                alt="product"
                                            />
                                            <div className={style.info}>
                                                <span>{el.name}</span>
                                                <span>
                                                    Giá:{" "}
                                                    {numberWithCommas(
                                                        el.primaryPrice
                                                    )}
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "-0.4rem",
                                                            fontSize: "1.6rem",
                                                        }}
                                                    >
                                                        đ
                                                    </span>
                                                </span>
                                                <span>Số lượng: {el.qty}</span>
                                            </div>
                                        </div>
                                        <div className={style.total_price}>
                                            <span>
                                                Tổng:{" "}
                                                {numberWithCommas(
                                                    el.primaryPrice * el.qty
                                                )}
                                                <span
                                                    style={{
                                                        position: "relative",
                                                        top: "-0.4rem",
                                                        fontSize: "1.6rem",
                                                    }}
                                                >
                                                    đ
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col_lg_2_12">
                <div className={clsx(style.block_container)}>
                    <span className={style.sumary_title}>
                        <i
                            style={{ marginRight: "0.6rem" }}
                            className="fa-solid fa-sack-dollar"
                        ></i>
                        Tổng Đơn hàng
                    </span>
                    <div className={style.sumary_detail}>
                        <span className={style.title}>Phí sản phẩm</span>
                        <span className={style.content}>
                            {numberWithCommas(shippingInfo.productPrice)}
                            <span>đ</span>
                        </span>
                    </div>
                    <div className={style.sumary_detail}>
                        <span className={style.title}>Phí vận chuyển</span>
                        <span className={style.content}>
                            {numberWithCommas(shippingInfo.shippingPrice)}
                            <span>đ</span>
                        </span>
                    </div>{" "}
                    <div
                        className={style.sumary_detail}
                        style={{ fontWeight: "500" }}
                    >
                        <span className={style.title}>Tổng chi phí</span>
                        <span className={style.content}>
                            {numberWithCommas(
                                shippingInfo.productPrice +
                                    shippingInfo.shippingPrice
                            )}
                            <span>đ</span>
                        </span>
                    </div>
                    <div className={style.submit_btn}>
                        <button
                            className="primary_btn_style_1"
                            onClick={handleSubmitClick}
                        >
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
            {submitState ? (
                <PopUpNotify
                    title="Thông báo"
                    content="Quý khách xác nhận đặt đơn hàng này?"
                    active={true}
                ></PopUpNotify>
            ) : (
                <></>
            )}
        </div>
    );
}
