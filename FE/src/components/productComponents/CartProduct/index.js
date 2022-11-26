import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./cartProductStyle.module.scss";
import { numberWithCommas } from "~/vendor/js";
import cartInfoSlice, { addToCart } from "~/pages/user/CartInfo/cartInfoSlice";

function CartProduct({ cartItem }) {
    const [productQuantity, setProductQuantity] = useState(cartItem.qty);
    const dispatch = useDispatch();
    const cartActions = cartInfoSlice.actions;

    function handleQuantityMinus() {
        if (productQuantity > 1) {
            dispatch(
                cartInfoSlice.actions.modifyCart({
                    productId: cartItem.productId,
                    buyQty: productQuantity - 1,
                })
            );
            setProductQuantity(productQuantity - 1);
        }
    }
    function handleQuantityPlus() {
        if (productQuantity < cartItem.stock) {
            dispatch(
                cartInfoSlice.actions.modifyCart({
                    productId: cartItem.productId,
                    buyQty: productQuantity + 1,
                })
            );
            setProductQuantity(productQuantity + 1);
        }
    }
    function handleQuantityChange(e) {
        const quantityValue = parseInt(e.target.value);

        if (
            quantityValue <= 0 ||
            isNaN(quantityValue) ||
            quantityValue > cartItem.stock
        ) {
            setProductQuantity(1);
        } else {
            dispatch(
                cartInfoSlice.actions.modifyCart({
                    productId: cartItem.productId,
                    buyQty: e.target.value,
                })
            );
            setProductQuantity(e.target.value);
        }
    }
    function handleRemoveFromCart() {
        dispatch(
            cartInfoSlice.actions.removeFromCart({
                productId: cartItem.productId,
            })
        );
    }
    return (
        <div className={style.container}>
            <div className={style.product_container}>
                <div className={style.image_container}>
                    <img src={cartItem.image} alt="product" />
                </div>
                <div className={style.inFo_container}>
                    <span className={style.product_name}>{cartItem.name}</span>
                    <span className={style.product_price}>
                        Giá: {numberWithCommas(cartItem.primaryPrice)}
                    </span>
                    <div className={style.remove_btn}>
                        <button onClick={handleRemoveFromCart}>Xóa</button>
                    </div>
                </div>
            </div>

            <div className={style.quantity_container}>
                <button
                    className={style.quantity_selector}
                    onClick={handleQuantityMinus}
                >
                    <i className="fa-solid fa-minus"></i>
                </button>
                <input
                    type="number"
                    value={cartItem.qty}
                    onChange={(e) => handleQuantityChange(e)}
                    className={style.quantity_input}
                />
                <button
                    className={style.quantity_selector}
                    onClick={handleQuantityPlus}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <div className={style.price_container}>
                <span className={style.total_product_price}>
                    {numberWithCommas(
                        cartItem.primaryPrice * parseInt(productQuantity)
                    )}
                    <span>đ</span>
                </span>
            </div>
        </div>
    );
}

export default CartProduct;
