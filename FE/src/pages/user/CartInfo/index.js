import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import emptyCartImg from "~/vendor/image/empty_cart.jpg";
import CartProduct from "~/components/productComponents/CartProduct";
import { addToCart } from "./cartInfoSlice";
import style from "./cartInfoStyle.module.scss";
import Loading from "~/components/Loading";
import Error from "~/components/popupComponents/Error";
import { numberWithCommas } from "~/vendor/js";
import BreadCrumb from "~/components/BreadCrumb";

function CartInfo() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { loading, error } = useSelector((state) => state.cartInfo);
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const params = useParams();
    const productId = params.id;
    const [searchParams, setSearchParams] = useSearchParams();
    const buyQty = parseInt(searchParams.get("qty"));
    const [cartEmpty, setCartEmpty] = useState(true);
    const totalProductPrice = !cartEmpty
        ? cartItems.reduce(
              (total, product) =>
                  (total += product.primaryPrice * parseInt(product.qty)),
              0
          )
        : 0;
    useEffect(() => {
        cartItems === null || cartItems.length === 0
            ? setCartEmpty(true)
            : setCartEmpty(false);
    }, [cartItems]);

    useEffect(() => {
        return async () => {
            if (productId) {
                await dispatch(
                    addToCart({ productId: productId, buyQty: buyQty })
                );
            }
        };
    }, [dispatch, productId, buyQty]);

    return (
        <>
            <div className="row mb-2">
                <div className={"col_lg_8_12 align-center"}>
                    <BreadCrumb
                        directionMap={[
                            {
                                pageName: "Giỏ hàng",
                                currentPage: true,
                            },
                        ]}
                    />
                </div>
            </div>

            {loading ? (
                <Loading></Loading>
            ) : error !== "" ? (
                <Error type="danger" message={error}></Error>
            ) : (
                <div className={clsx("row mt-1")}>
                    <div className={clsx("col_lg_8_12", style.cart_container)}>
                        {/* cart List */}
                        <div className={style.cart_list}>
                            <div className={style.list_title}>
                                <span className={style.title_product}>
                                    Sản phẩm
                                </span>
                                <span className={style.title_quantity}>
                                    Số lượng
                                </span>
                                <span className={style.title_price}>
                                    Chi phí
                                </span>
                            </div>
                            <div className={style.list_content}>
                                {cartEmpty ? (
                                    <div className={style.empty_cart_container}>
                                        <img
                                            src={emptyCartImg}
                                            alt="empty cart"
                                            className={style.empty_cart_img}
                                        />
                                        <Link
                                            to="/"
                                            className={style.empty_cart_link}
                                        >
                                            Giỏ hàng trống, ấn vào đây để mua
                                            hàng.{" "}
                                        </Link>
                                    </div>
                                ) : (
                                    cartItems.map((cartItem, index) => (
                                        <CartProduct
                                            key={index}
                                            cartItem={cartItem}
                                        ></CartProduct>
                                    ))
                                )}
                            </div>
                        </div>
                        {/* end cart list */}
                        {cartEmpty ? (
                            <></>
                        ) : (
                            <div className={style.cart_sumary}>
                                <div className={style.total_price_container}>
                                    <span>Tiền hàng</span>
                                    <span className={style.price}>
                                        {numberWithCommas(totalProductPrice)}
                                        <span>đ</span>
                                    </span>
                                </div>

                                {/* <div className={style.total_price_container}>
                                    <span>Tổng chi phí</span>
                                    <span className={style.price}>
                                        {numberWithCommas(
                                            totalProductPrice
                                        )}
                                        <span>đ</span>
                                    </span>
                                </div> */}
                                <div className={style.continue_btn}>
                                    <button
                                        className="primary_btn_style_1"
                                        onClick={() => {
                                            history("/shippingInfo");
                                        }}
                                    >
                                        Đến thanh toán
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default CartInfo;
