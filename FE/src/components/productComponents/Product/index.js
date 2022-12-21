import style from "./productStyle.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "~/vendor/js";
import { addToCart } from "~/pages/user/CartInfo/cartInfoSlice.js";
import StarRate from "~/components/productComponents/StarRate";

function Product({ product }) {
    const dispatch = useDispatch();
    const outOfStockBtn = product.stock <= 0;
    const [averageRate, setAverageRate] = useState(5);
    const [numRate, setNumRate] = useState(0);
    const [totalRate, settotalRate] = useState(0);
    async function handleAddToCart() {
        if (product.stock > 0) {
            await dispatch(addToCart({ productId: product._id, buyQty: 1 }));
        }
    }

    useEffect(() => {
        if (product.commentsId) {
            const comments = product.commentsId.comments;
            let totalRate = 0;
            if (comments) {
                comments.map((el) => {
                    setNumRate((rev) => rev + 1);
                    totalRate += el.rate;
                });
                settotalRate(totalRate);
            }
        }
    }, []);

    useEffect(() => {
        setAverageRate((totalRate / numRate).toFixed(1));
    }, [totalRate, numRate]);
    return (
        <div className="col_lg_2_8">
            <div className={clsx("row", style.product)}>
                {product.primaryPrice < product.oldPrice ? (
                    <div className={style.discount_container}>
                        <span>Giảm</span>
                        <span>
                            {(
                                (
                                    1 -
                                    product.primaryPrice / product.oldPrice
                                ).toFixed(2) * 100
                            ).toFixed(0)}
                            %
                        </span>
                    </div>
                ) : (
                    <></>
                )}

                <Link
                    className={clsx(style.productLink, "product_Link")}
                    to={`/product/${product._id}`}
                >
                    <div className={style.productImage_container}>
                        <img
                            className={style.productImg}
                            src={product.image}
                            alt="prduct img"
                        />
                    </div>
                    <span className={style.productName}>{product.name}</span>
                    {product.primaryPrice < product.oldPrice ? (
                        <div className={style.productPriceContainer}>
                            <span className={style.productPrimaryPrice}>
                                {numberWithCommas(
                                    parseInt(product.primaryPrice)
                                )}
                                <span>đ</span>
                            </span>
                            <span className={style.productOldPrice}>
                                {numberWithCommas(parseInt(product.oldPrice))}
                                <span>đ</span>
                            </span>
                        </div>
                    ) : (
                        <div className={style.productPriceContainer}>
                            <span className={style.productPrimaryPrice}>
                                {numberWithCommas(
                                    parseInt(product.primaryPrice)
                                )}
                                <span>đ</span>
                            </span>
                        </div>
                    )}
                    <div className={style.productRateContainer}>
                        <StarRate
                            rate={averageRate}
                            numPreview={numRate}
                        ></StarRate>
                    </div>
                </Link>
                <div className={style.addToCartBtn}>
                    <button
                        className={clsx(
                            "fly_to_cart_btn",
                            { ["primary_btn_style_2"]: !outOfStockBtn },
                            {
                                [style.outOfStock__active]: outOfStockBtn,
                            }
                        )}
                        onClick={handleAddToCart}
                        disabled={outOfStockBtn}
                    >
                        {outOfStockBtn ? "Tạm hết hàng" : "Chọn mua"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;
