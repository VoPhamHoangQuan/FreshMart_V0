import clsx from "clsx";
import React from "react";
import style from "./starRate.module.scss";
export default function StarRate(props) {
    return (
        <div className={style.container}>
            <i
                className={
                    props.rate >= 1
                        ? clsx("fa fa-star", style.rated)
                        : props.rate >= 0.5
                        ? clsx("fa fa-star-half-o", style.rated)
                        : clsx("fa fa-star-o", style.unrated)
                }
            ></i>

            <i
                className={
                    props.rate >= 2
                        ? clsx("fa fa-star", style.rated)
                        : props.rate >= 1.5
                        ? clsx("fa fa-star-half-o", style.rated)
                        : clsx("fa fa-star-o", style.unrated)
                }
            ></i>

            <i
                className={
                    props.rate >= 3
                        ? clsx("fa fa-star", style.rated)
                        : props.rate >= 2.5
                        ? clsx("fa fa-star-half-o", style.rated)
                        : clsx("fa fa-star-o", style.unrated)
                }
            ></i>

            <i
                className={
                    props.rate >= 4
                        ? clsx("fa fa-star", style.rated)
                        : props.rate >= 3.5
                        ? clsx("fa fa-star-half-o", style.rated)
                        : clsx("fa fa-star-o", style.unrated)
                }
            ></i>

            <i
                className={
                    props.rate >= 5
                        ? clsx("fa fa-star", style.rated)
                        : props.rate >= 4.5
                        ? clsx("fa fa-star-half-o", style.rated)
                        : clsx("fa fa-star-o", style.unrated)
                }
            ></i>
            {props.numPreview ? (
                <span> {props.numPreview} Lượt đánh giá </span>
            ) : props.rate === 1 ? (
                <span> Tệ </span>
            ) : props.rate === 2 ? (
                <span> Tạm được </span>
            ) : props.rate === 3 ? (
                <span> Khá tốt </span>
            ) : props.rate === 4 ? (
                <span> Tốt </span>
            ) : props.rate === 5 ? (
                <span> Tuyệt vời </span>
            ) : (
                <span> Không có đánh giá </span>
            )}
        </div>
    );
}
