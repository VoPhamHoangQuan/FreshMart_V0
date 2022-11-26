import style from "./productStyle.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { numberWithCommas } from "~/vendor/js";
import { useDispatch } from "react-redux";
import { addToCart } from "~/pages/user/CartInfo/cartInfoSlice.js";

function Product({ product }) {
    const dispatch = useDispatch();
    const outOfStockBtn = product.stock <= 0;
    async function handleAddToCart() {
        if (product.stock > 0) {
            await dispatch(addToCart({ productId: product._id, buyQty: 1 }));
        }
    }

    return (
        <div className="col_lg_2_8">
            <div className={clsx("row", style.product)}>
                <Link
                    className={clsx(style.productLink, "product_Link")}
                    to={`/product/${product._id}`}
                >
                    <img
                        className={style.productImg}
                        src={product.image}
                        alt="prduct img"
                    />
                    <span className={style.productName}>{product.name}</span>
                    <div className={style.productPriceContainer}>
                        <span className={style.productPrimaryPrice}>
                            {numberWithCommas(parseInt(product.primaryPrice))}
                            <span>đ</span>
                        </span>
                        <span className={style.productOldPrice}>
                            {numberWithCommas(parseInt(product.oldPrice))}
                            <span>đ</span>
                        </span>
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
