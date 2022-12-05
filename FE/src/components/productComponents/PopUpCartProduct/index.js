import React from "react";
import style from "./popupCartProduct.module.scss";
import emptyCartImg from "~/vendor/image/empty_cart.jpg";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "~/vendor/js";

export default function PopUpCartProduct({ cartItems }) {
    const history = useNavigate();
    return (
        <>
            <div className={style.container}>
                {cartItems && cartItems.length > 0 ? (
                    <>
                        <span className={style.title}>Sản phẩm mới thêm</span>
                        <div className={style.cartContainer}>
                            {cartItems && cartItems.length !== 0 ? (
                                cartItems.map((el, id) => (
                                    <div
                                        key={id}
                                        className={style.itemContainer}
                                    >
                                        <div className={style.productInfo}>
                                            <img
                                                src={el.image}
                                                alt="product/"
                                            />
                                            <span className={style.name}>
                                                {el.name}
                                            </span>
                                        </div>
                                        <div className={style.productInfo}>
                                            <span className={style.price}>
                                                {numberWithCommas(
                                                    el.primaryPrice
                                                )}
                                                <span>đ</span>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className={style.btnContainer}>
                            <button
                                className="primary_btn_style_1 mt-1"
                                onClick={() => {
                                    history("/cart");
                                }}
                            >
                                Đến giỏ hàng
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={style.emptyCartImg_container}>
                        <img src={emptyCartImg} alt="empty cart"></img>
                        <span>Giỏ hàng trống, hãy mua gì đi nào.</span>
                    </div>
                )}
            </div>
        </>
    );
}
