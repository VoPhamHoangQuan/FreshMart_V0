import clsx from "clsx";
import { useState } from "react";
import style from "./sideBar.module.scss";

function Sidebar() {
    {
        /* logic tam thoi check ui */
    }

    const [active, setActive] = useState(false);
    const [itemClicked, setItemClicked] = useState("");
    const handleSidebarItemClick = (id) => {
        setItemClicked(id);
        setActive(!active);
    };
    {
        /* logic tam thoi check ui */
    }

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
                    {/* logic tam thoi check ui */}
                    <li className={style.sidebar_item}>
                        <div
                            id="1"
                            className={style.sidebar_itemParent}
                            onClick={(id) => handleSidebarItemClick(id)}
                        >
                            <span>
                                THỊT, CÁ, TRỨNG, HẢI, TextLong, TextLong,
                                TextLong, TextLong
                            </span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <div
                            className={clsx(
                                style.sidebar_itemChildList,
                                active && itemClicked
                                    ? style.sidebar_itemChildList__active
                                    : style.sidebar_itemChildList
                            )}
                        >
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
                            <i className="fa-solid fa-chevron-down"></i>
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
