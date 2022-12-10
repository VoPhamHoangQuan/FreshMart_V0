import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./sideBar.module.scss";
import { fetchProductListBySearch } from "~/pages/user/HomeUser/homeUserSlide";

function Sidebar() {
    const dispatch = useDispatch();
    function handleCategoryClick(category) {
        dispatch(fetchProductListBySearch({ key: category }));
    }
    return (
        <div className={clsx("col_lg_1_10 mt-1 mr-2")}>
            <div className={clsx("row", style.sidebar_container)}>
                <ul className={style.sidebar_cateList}>
                    <li>
                        <div className={style.sidebar_title}>
                            <i className="fa-solid fa-bars"></i>
                            <span>DANH MỤC SẢN PHẨM</span>
                        </div>
                    </li>
                    <li className={style.sidebar_item}>
                        <div className={style.sidebar_itemParent}>
                            <span>Thịt, cá, trứng, hải sản</span>
                        </div>
                        <div className={clsx(style.sidebar_itemChildList)}>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() => handleCategoryClick("pork")}
                            >
                                <span>Thịt heo các loại</span>
                            </div>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() => handleCategoryClick("chicken")}
                            >
                                <span>Thịt gà các loại</span>
                            </div>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() => handleCategoryClick("fish")}
                            >
                                <span>Cá các loại</span>
                            </div>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() => handleCategoryClick("sea food")}
                            >
                                <span>Hải sản các loại</span>
                            </div>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() => handleCategoryClick("egg")}
                            >
                                <span>Trứng các loại</span>
                            </div>
                        </div>
                    </li>

                    <li className={style.sidebar_item}>
                        <div className={style.sidebar_itemParent}>
                            <span>Rau, củ, quả</span>
                        </div>
                        <div className={style.sidebar_itemChildList}>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() => handleCategoryClick("vegetable")}
                            >
                                <span>Rau các loại</span>
                            </div>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() =>
                                    handleCategoryClick("root vegetable")
                                }
                            >
                                <span>củ các loại</span>
                            </div>
                            <div
                                className={style.sidebar_itemChild}
                                onClick={() => handleCategoryClick("fruit")}
                            >
                                <span>quả các loại</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
