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
                                Th??ng tin li??n l???c v???n chuy???n
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>Ng?????i ?????t h??ng:</span>
                            <span className={style.content}>
                                {shippingInfo.customerGender === "male"
                                    ? "Anh"
                                    : "Ch???"}{" "}
                                {shippingInfo.customerName}
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>S??? ??i???n tho???i:</span>
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
                                ?????a ch??? giao h??ng:
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
                                Ph????ng th???c thanh to??n
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>Ph????ng th???c:</span>
                            <span className={style.content}>
                                {shippingInfo.paymentMethod === "cash"
                                    ? "Ti???n m???t khi nh???n h??ng"
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
                                Gi??? h??ng
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
                                                    Gi??:{" "}
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
                                                        ??
                                                    </span>
                                                </span>
                                                <span>S??? l?????ng: {el.qty}</span>
                                            </div>
                                        </div>
                                        <div className={style.total_price}>
                                            <span>
                                                T???ng:{" "}
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
                                                    ??
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
                        T???ng ????n h??ng
                    </span>
                    <div className={style.sumary_detail}>
                        <span className={style.title}>Ph?? s???n ph???m</span>
                        <span className={style.content}>
                            {numberWithCommas(shippingInfo.productPrice)}
                            <span>??</span>
                        </span>
                    </div>
                    <div className={style.sumary_detail}>
                        <span className={style.title}>Ph?? v???n chuy???n</span>
                        <span className={style.content}>
                            {numberWithCommas(shippingInfo.shippingPrice)}
                            <span>??</span>
                        </span>
                    </div>{" "}
                    <div
                        className={style.sumary_detail}
                        style={{ fontWeight: "500" }}
                    >
                        <span className={style.title}>T???ng chi ph??</span>
                        <span className={style.content}>
                            {numberWithCommas(
                                shippingInfo.productPrice +
                                    shippingInfo.shippingPrice
                            )}
                            <span>??</span>
                        </span>
                    </div>
                    <div className={style.submit_btn}>
                        <button
                            className="primary_btn_style_1"
                            onClick={handleSubmitClick}
                        >
                            ?????t h??ng
                        </button>
                    </div>
                </div>
            </div>
            {submitState ? (
                <PopUpNotify
                    title="Th??ng b??o"
                    content="Qu?? kh??ch x??c nh???n ?????t ????n h??ng n??y?"
                    active={true}
                ></PopUpNotify>
            ) : (
                <></>
            )}
        </div>
    );
}
