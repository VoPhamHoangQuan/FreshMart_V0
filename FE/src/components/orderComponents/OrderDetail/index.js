import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { numberWithCommas, reverseFormatPhoneNumber } from "~/vendor/js";
import style from "./orderDetailStyle.module.scss";
import {
    fetchOrderDetail,
    fetchVNDRate,
    fetchModifyIsPaidOrder,
} from "~/pages/user/OrderInfo/orderInfoSlice";
import shippingConfirmSlice from "~/pages/user/ShippingConfirm/shippingConfirmSlice";
import AutoPopUpNotify from "~/components/popupComponents/AutoPopUpNotify";

export default function OrderDetail() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { order, VNDRate } = useSelector((state) => state.orderInfo);
    const { message } = useSelector((state) => state.orderInfo);
    const [notify, setNotyfy] = useState(false);
    const [fetchData, setFetchData] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [paidTime, setPaidTime] = useState("");
    const [isDelivered, SetIsDelivered] = useState(false);
    const [deliveredTime, setDeliveredTime] = useState("");

    function forceAuthentication(userInfo) {
        if (!userInfo) {
            history("/signin");
        }
    }

    function convertVNDToUSD(vndValue) {
        const usdValue = (vndValue / parseInt(VNDRate)).toFixed(2);
        return usdValue;
    }

    function handleOrderPaid(orderId) {
        const paidAt = Date.now();
        dispatch(fetchModifyIsPaidOrder({ orderId, isPaid: true, paidAt }));
        dispatch(fetchOrderDetail({ orderId }));
    }

    useEffect(() => {
        setFetchData(true);
        order.isPaid === true ? setIsPaid(true) : setIsPaid(false);
        order.isDelivered === true
            ? SetIsDelivered(true)
            : SetIsDelivered(false);
        setPaidTime(new Date(order.paidAt).toLocaleString());
        setDeliveredTime(new Date(order.deliveredAt).toLocaleString());
    }, [order]);

    useEffect(() => {
        forceAuthentication(userInfo);
        dispatch(shippingConfirmSlice.actions.clearCreatedOrder());
        dispatch(fetchVNDRate());
    }, []);

    useEffect(() => {
        message === "update order success" ? setNotyfy(true) : setNotyfy(false);
    }, [message]);

    return (
        <div className="row mt-1">
            {notify ? (
                <AutoPopUpNotify message="Đã thanh toán thành công."></AutoPopUpNotify>
            ) : (
                <></>
            )}
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
                                {fetchData
                                    ? order.userInfo.gender === "male"
                                        ? `Anh ${order.userInfo.name}`
                                        : `Chị ${order.userInfo.name}`
                                    : ""}{" "}
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>Số điện thoại:</span>
                            <span className={style.content}>
                                {fetchData
                                    ? order.shippingInfo.shippingPhone.length <
                                      4
                                        ? `${reverseFormatPhoneNumber(
                                              order.userInfo.phone
                                          )}`
                                        : `${reverseFormatPhoneNumber(
                                              order.shippingInfo.shippingPhone
                                          )}  -  ${reverseFormatPhoneNumber(
                                              order.userInfo.phone
                                          )}`
                                    : ""}
                            </span>
                        </div>
                        <div className={style.detail_container}>
                            <span className={style.title}>
                                Địa chỉ giao hàng:
                            </span>
                            <span className={style.content}>
                                {fetchData ? order.shippingInfo.address : ""}
                            </span>
                        </div>
                        {isDelivered ? (
                            <div className={style.status_container}>
                                <span className={style.title}>Trạng thái:</span>
                                <span className={style.content}>
                                    Đã nhận hàng {`(${deliveredTime})`}
                                </span>
                            </div>
                        ) : (
                            <div
                                className={clsx(
                                    style.status_container,
                                    style.status_container__active
                                )}
                            >
                                <span className={style.title}>Trạng thái:</span>
                                <span className={style.content}>
                                    Đang vận chuyển
                                </span>
                            </div>
                        )}
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
                                {fetchData
                                    ? order.paymentMethod === "cash"
                                        ? "Tiền mặt khi nhận hàng"
                                        : order.paymentMethod
                                    : ""}
                            </span>
                        </div>
                        {isPaid ? (
                            <div className={style.status_container}>
                                <span className={style.title}>Trạng thái:</span>
                                <span className={style.content}>
                                    Đã thanh toán
                                    {order.paidAt ? ` (${paidTime})` : ""}
                                </span>
                            </div>
                        ) : (
                            <div
                                className={clsx(
                                    style.status_container,
                                    style.status_container__active
                                )}
                            >
                                <span className={style.title}>Trạng thái:</span>
                                <span className={style.content}>
                                    Chưa thanh toán
                                </span>
                            </div>
                        )}
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
                            {fetchData ? (
                                order.orderItems.map((el, id) => (
                                    <div
                                        className={style.product_container}
                                        key={id}
                                    >
                                        <div className={style.product_detail}>
                                            <img
                                                className={style.image}
                                                src={el.productId.image}
                                                alt="product"
                                            />
                                            <div className={style.info}>
                                                <span>{el.productId.name}</span>
                                                <span>
                                                    Giá:{" "}
                                                    {numberWithCommas(
                                                        el.productId
                                                            .primaryPrice
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
                                                    el.productId.primaryPrice *
                                                        el.qty
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
                            {fetchData
                                ? numberWithCommas(
                                      order.shippingInfo.itemsPrice
                                  )
                                : ""}
                            <span>đ</span>
                        </span>
                    </div>
                    <div className={style.sumary_detail}>
                        <span className={style.title}>Phí vận chuyển</span>
                        <span className={style.content}>
                            {fetchData
                                ? numberWithCommas(
                                      order.shippingInfo.shippingPrice
                                  )
                                : ""}
                            <span>đ</span>
                        </span>
                    </div>{" "}
                    <div
                        className={style.sumary_detail}
                        style={{ fontWeight: "500" }}
                    >
                        <span className={style.title}>Tổng chi phí</span>
                        <span className={style.content}>
                            {fetchData
                                ? numberWithCommas(
                                      order.shippingInfo.itemsPrice +
                                          order.shippingInfo.shippingPrice
                                  )
                                : ""}
                            <span>đ</span>
                        </span>
                    </div>
                    <>
                        {fetchData &&
                        !isPaid &&
                        order.paymentMethod !== "cash" ? (
                            <PayPalScriptProvider
                                options={{
                                    "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
                                }}
                            >
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: "USD",
                                                        value: convertVNDToUSD(
                                                            order.shippingInfo
                                                                .itemsPrice +
                                                                order
                                                                    .shippingInfo
                                                                    .shippingPrice
                                                        ),
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(actions) => {
                                        handleOrderPaid(order._id);
                                    }}
                                    onError={(err) => {
                                        console.log(err);
                                    }}
                                />
                            </PayPalScriptProvider>
                        ) : (
                            <></>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}
