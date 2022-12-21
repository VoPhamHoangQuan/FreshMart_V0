import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./productDetailStyle.module.scss";
import Carousel from "~/components/CarouselComponent";
import { numberWithCommas } from "~/vendor/js";
import { addToCart } from "~/pages/user/CartInfo/cartInfoSlice.js";
import StarRate from "~/components/productComponents/StarRate";
import AutoPopUpNotify from "~/components/popupComponents/AutoPopUpNotify";

function ProductDetail({ data }) {
    const dispatch = useDispatch();
    const [inStock, setInStock] = useState(true);
    const [productQuantity, setProductQuantity] = useState(1);
    const [averageRate, setAverageRate] = useState(5);
    const [numRate, setNumRate] = useState(0);
    const [totalRate, settotalRate] = useState(0);
    const { message } = useSelector((state) => state.cartInfo);
    const [notify, setNotyfy] = useState(false);

    function handleQuantityMinus() {
        productQuantity > 1
            ? setProductQuantity((prev) => prev - 1)
            : setProductQuantity(productQuantity);
    }
    function handleQuantityPlus() {
        productQuantity < data.stock
            ? setProductQuantity((prev) => prev + 1)
            : setProductQuantity(data.stock);
    }
    function handleQuantityChange(e) {
        e.target.value <= 0 || e.target.value === ""
            ? setProductQuantity(1)
            : e.target.value > data.stock
            ? setProductQuantity(parseInt(`${data.stock}`))
            : setProductQuantity(parseInt(e.target.value));
    }

    async function handleAddToCart() {
        await dispatch(
            addToCart({ productId: data._id, buyQty: productQuantity })
        );
    }

    useEffect(() => {
        message === "addToCartSuccess" ? setNotyfy(true) : setNotyfy(false);
    }, [message]);

    useEffect(() => {
        if (data.commentsId) {
            const comments = data.commentsId.comments;
            let totalRate = 0;
            comments.map((el) => {
                setNumRate((rev) => rev + 1);
                totalRate += el.rate;
            });
            settotalRate(totalRate);
        }
    }, [data.commentsId]);

    useEffect(() => {
        setAverageRate((totalRate / numRate).toFixed(1));
    }, [totalRate]);

    useEffect(() => {
        if (data.stock === 0) {
            setInStock(false);
        }
    }, [data]);

    return (
        <>
            {notify ? (
                <AutoPopUpNotify message="Đã thêm sản phẩm vào giỏ hàng."></AutoPopUpNotify>
            ) : (
                <></>
            )}
            {/* Product Detail */}
            <div className="row">
                <div className={clsx(style.product_detail_container, "mt-1")}>
                    <div className={style.product_image}>
                        <Carousel
                            carouselItem={[
                                {
                                    img: data.image,
                                    link: "https://www.bachhoaxanh.com",
                                },
                            ]}
                            showThumbs={true}
                        ></Carousel>
                    </div>

                    <div className={style.product_info}>
                        <span className={style.product_name}>{data.name}</span>
                        <div className={style.product_price}>
                            {data.primaryPrice < data.oldPrice ? (
                                <>
                                    <div>
                                        <span className={style.primary_price}>
                                            {numberWithCommas(
                                                parseInt(data.primaryPrice)
                                            )}
                                            <span>đ</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className={style.old_price}>
                                            {numberWithCommas(
                                                parseInt(data.oldPrice)
                                            )}
                                            <span>đ</span>
                                        </span>
                                    </div>

                                    <div className={style.discount_percent}>
                                        <span>
                                            {`Giảm 
                                        ${(
                                            (
                                                1 -
                                                data.primaryPrice /
                                                    data.oldPrice
                                            ).toFixed(2) * 100
                                        ).toFixed(0)}%`}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <span className={style.primary_price}>
                                            {numberWithCommas(
                                                parseInt(data.primaryPrice)
                                            )}
                                            <span>đ</span>
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div>
                            <StarRate
                                rate={averageRate}
                                numPreview={numRate}
                            ></StarRate>
                        </div>
                        <div className={style.product_sliceInfo}>
                            <div className={style.sliceInfo}>
                                <span>Xuất xứ:</span>
                                <span>{data.origin} </span>
                            </div>
                            <div className={style.sliceInfo}>
                                <span>Trạng thái:</span>
                                <span
                                    className={clsx(style.product_state, {
                                        [style.product_state__inStock]:
                                            data.stock > 0,
                                        [style.product_state__outOfStock]:
                                            data.stock <= 0,
                                    })}
                                >
                                    {data.stock > 0 ? "Còn hàng" : "Hết hàng"}
                                </span>
                            </div>
                        </div>

                        {data.stock > 0 ? (
                            <div className={style.product_quantity}>
                                <span className={style.quantity_title}>
                                    Số lượng
                                </span>

                                <div className={style.quantity_control}>
                                    <button
                                        className={style.quantity_selector}
                                        onClick={handleQuantityMinus}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <input
                                        value={productQuantity}
                                        onChange={(e) =>
                                            handleQuantityChange(e)
                                        }
                                        className={style.quantity_input}
                                    />
                                    <button
                                        className={style.quantity_selector}
                                        onClick={handleQuantityPlus}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>

                                <button
                                    className="primary_btn_style_1 mt-2"
                                    onClick={handleAddToCart}
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            {/* end product detail */}

            {/* product description */}
            <div className="row">
                <div
                    className={clsx(
                        style.product_description_container,
                        "mt-1"
                    )}
                >
                    <h3>Thông tin sản phẩm</h3>
                    <div className={style.product_description}>
                        <span>{data.description}</span>
                    </div>
                    <div className={style.product_extraDetail_container}>
                        <span className={style.extraDetail_title}>
                            Hạn sử dụng:
                        </span>
                        <span className={style.extraDetail_content}>
                            {data.exp}
                        </span>
                    </div>
                    <div className={style.product_extraDetail_container}>
                        <span className={style.extraDetail_title}>
                            Thương hiệu:
                        </span>
                        <span className={style.extraDetail_content}>
                            {data.brand}
                        </span>
                    </div>
                    <div className={style.product_extraDetail_container}>
                        <span className={style.extraDetail_title}>
                            Khối lượng:
                        </span>
                        <span className={style.extraDetail_content}>
                            {data.weight} Kg
                        </span>
                    </div>
                </div>
            </div>
            {/* end product disciption */}
        </>
    );
}

export default ProductDetail;
