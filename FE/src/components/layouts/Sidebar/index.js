import clsx from "clsx";
import { useState } from "react";
import style from "./sideBar.module.scss";

function Sidebar() {
    return (
        <div className={clsx("col_lg_2_10 mt-1 mr-1")}>
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
                            <span>
                                THỊT, CÁ, TRỨNG, HẢI, TextLong, TextLong,
                                TextLong, TextLong
                            </span>
                        </div>
                        <div className={clsx(style.sidebar_itemChildList)}>
                            <div className={style.sidebar_itemChild}>
                                <span>Thịt các loại</span>
                            </div>
                            <div className={style.sidebar_itemChild}>
                                <span>Cá các loại</span>
                            </div>
                            <div className={style.sidebar_itemChild}>
                                <span>Trứng</span>
                            </div>
                            <div className={style.sidebar_itemChild}>
                                <span>Hải sản các loại</span>
                            </div>
                        </div>
                    </li>

                    <li className={style.sidebar_item}>
                        <div className={style.sidebar_itemParent}>
                            <span>THỊT, CÁ, TRỨNG, HẢI SẢN</span>
                        </div>
                        <div className={style.sidebar_itemChildList}>
                            <div className={style.sidebar_itemChild}>
                                <span>Thịt</span>
                            </div>
                            <div className={style.sidebar_itemChild}>
                                <span>Cá</span>
                            </div>
                            <div className={style.sidebar_itemChild}>
                                <span>Trứng</span>
                            </div>
                            <div className={style.sidebar_itemChild}>
                                <span>Hải sản</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
