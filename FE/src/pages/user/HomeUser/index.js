import clsx from "clsx";
import style from "./homeUser.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import homeUserSlice, { fetchProductList } from "./homeUserSlide.js";
import {
    homeUserSelector,
    productListCategoryMeatSelector,
    productListCategoryVegetableSelector,
} from "./homeUserSelectors.js";
import Loading from "~/components/Loading";
import Error from "~/components/popupComponents/Error";
import Product from "~/components/productComponents/Product";
import Carousel from "~/components/CarouselComponent";
import AutoPopUpNotify from "~/components/popupComponents/AutoPopUpNotify";

function HomeUser() {
    const dispatch = useDispatch();
    const { productListBySearch, error, loading, productList } = useSelector(
        (state) => state.homeUser
    );
    const { message } = useSelector((state) => state.cartInfo);
    const [notify, setNotyfy] = useState(false);
    const [currentMeatProductNum, setCurrentMeatProductNum] = useState(8);
    const [currentVegetableProductNum, setCurrentVegetableProductNum] =
        useState(8);
    const homeUser = useSelector(homeUserSelector);
    const meatList = useSelector(productListCategoryMeatSelector).slice(
        0,
        currentMeatProductNum
    );

    const vegetableList = useSelector(
        productListCategoryVegetableSelector
    ).slice(0, currentVegetableProductNum);

    useEffect(() => {
        const fetchProductListData = async () => {
            await dispatch(fetchProductList());
        };
        fetchProductListData();
    }, [dispatch]);

    useEffect(() => {
        message === "addToCartSuccess" ? setNotyfy(true) : setNotyfy(false);
    }, [message]);

    function handleCategoryMeatClick(e) {
        dispatch(homeUserSlice.actions.setCategoryMeatFilter(e.target.value));
    }

    function handleCategoryVegetableClick(e) {
        dispatch(
            homeUserSlice.actions.setCategoryVegetableFilter(e.target.value)
        );
    }

    return (
        <div className={clsx("col_lg_8_10")}>
            {notify ? (
                <AutoPopUpNotify message="Đã thêm sản phẩm vào giỏ hàng."></AutoPopUpNotify>
            ) : (
                <></>
            )}
            {loading ? (
                <Loading></Loading>
            ) : error !== "" ? (
                <Error type="danger" message={homeUser.error}></Error>
            ) : productListBySearch.length === 0 && productList.length > 0 ? (
                <>
                    {/* carousel */}
                    <div className={clsx("row ", "mt-1")}>
                        <Carousel
                            carouselItem={[
                                {
                                    img: "https://cdn.tgdd.vn/bachhoaxanh/banners/5599/fresh-khuyen-mai-gia-soc-2010202222524.jpg",
                                    link: "#",
                                },
                                {
                                    img: "https://cdn.tgdd.vn/bachhoaxanh/banners/5599/ngay-chay-21122022112655.jpg",
                                    link: "#",
                                },
                            ]}
                            showThumbs={false}
                        ></Carousel>
                    </div>
                    {/* end carousel */}

                    {/* Meat Product Section */}
                    <div className={clsx("row ", "mt-1")}>
                        <div className={style.homeUser_productSection}>
                            <div
                                className={clsx(style.productSection_Container)}
                            >
                                {/* title */}
                                <div
                                    className={
                                        style.productSection_titleContainer
                                    }
                                >
                                    <div className={style.title}>
                                        <span>thịt, cá, trứng, hải sản</span>
                                    </div>
                                    <div className={style.control}>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={[
                                                "pork",
                                                "chicken",
                                                "fish",
                                                "sea food",
                                                "egg",
                                            ]}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Thịt, Cá, Trứng, Hải sản
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={["pork", "chicken"]}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Thịt các loại
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={["fish"]}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Cá các loại
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"sea food"}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Hải sản các loại
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"egg"}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Trứng
                                        </button>
                                    </div>
                                </div>
                                {/* end title */}

                                {/* product show case */}
                                <div
                                    className={
                                        style.productSection_productContainer
                                    }
                                >
                                    {meatList.map((product, index) => (
                                        <Product
                                            key={index}
                                            product={product}
                                        ></Product>
                                    ))}
                                </div>
                                {/*end product show case */}
                            </div>
                            <div className={style.productSection_seeMore}>
                                <span
                                    onClick={() =>
                                        setCurrentMeatProductNum(
                                            (prev) => prev + 8
                                        )
                                    }
                                >
                                    Xem thêm
                                    <i className="fa-solid fa-sort-down"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* end Meat Product Section */}

                    {/* vegetable Product Section */}
                    <div className={clsx("row ", "mt-1")}>
                        <div className={style.homeUser_productSection}>
                            <div
                                className={clsx(style.productSection_Container)}
                            >
                                {/* title */}
                                <div
                                    className={
                                        style.productSection_titleContainer
                                    }
                                >
                                    <div className={style.title}>
                                        <span>rau, củ, trái cây</span>
                                    </div>
                                    <div className={style.control}>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={[
                                                "vegetable",
                                                "root vegetable",
                                                "fruit",
                                            ]}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Rau, Củ, Trái cây
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"vegetable"}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Rau lá các loại
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"root vegetable"}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Rau củ các loại
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"fruit"}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Trái cây các loại
                                        </button>
                                    </div>
                                </div>
                                {/* end title */}

                                {/* product show case */}
                                <div
                                    className={
                                        style.productSection_productContainer
                                    }
                                >
                                    {vegetableList.map((product, index) => (
                                        <Product
                                            key={index}
                                            product={product}
                                        ></Product>
                                    ))}
                                </div>
                                {/*end product show case */}
                            </div>
                            <div className={style.productSection_seeMore}>
                                <span
                                    onClick={() =>
                                        setCurrentVegetableProductNum(
                                            (prev) => prev + 8
                                        )
                                    }
                                >
                                    Xem thêm
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* end Vegetable Product Section */}
                </>
            ) : (
                <div className={clsx("row ", "mt-1")}>
                    <div className={style.homeUser_productSection}>
                        <div className={clsx(style.productSection_Container)}>
                            {/* title */}
                            <div
                                className={style.productSection_titleContainer}
                            >
                                <div className={style.title}>
                                    <span>SẢN PHẨM TÌM ĐƯỢC</span>
                                </div>
                            </div>
                            {/* end title */}

                            {/* product show case */}
                            <div
                                className={
                                    style.productSection_productContainer
                                }
                            >
                                {productListBySearch.map((product, index) => (
                                    <Product
                                        key={index}
                                        product={product}
                                    ></Product>
                                ))}
                            </div>
                            {/*end product show case */}
                        </div>
                        <div className={style.productSection_seeMore}>
                            <span
                                onClick={() =>
                                    setCurrentMeatProductNum((prev) => prev + 8)
                                }
                            >
                                Xem thêm
                                <i className="fa-solid fa-sort-down"></i>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeUser;
