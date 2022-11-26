import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import style from "./breadCrumbStyle.module.scss";
function BreadCrumb({ directionMap }) {
    return (
        <div className={clsx("row mt-1", style.breadCrumb_container)}>
            <ul className={style.breadCrumb_list}>
                <li className={style.breadCrumb_item}>
                    <Link to="/" className={style.breadCrumb_link}>
                        Trang chủ
                    </Link>
                </li>
                {directionMap.map((el, index) => (
                    <li key={index} className={style.breadCrumb_item}>
                        <i className="fa-solid fa-chevron-right"></i>
                        <Link
                            to={`/${el.pageSource}`}
                            className={clsx(style.breadCrumb_link, {
                                [style.breadCrumb_link__active]: el.currentPage,
                            })}
                            onClick={(e) =>
                                el.currentPage ? e.preventDefault() : ""
                            }
                        >
                            {el.pageName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BreadCrumb;
