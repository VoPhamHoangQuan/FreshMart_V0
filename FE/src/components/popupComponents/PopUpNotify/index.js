import React, { useState } from "react";
import style from "./PopUpNotify.module.scss";
import attentionImg from "~/vendor/image/attention_image.png";
import clsx from "clsx";

export default function PopUpNotify({ title, content, callback, active }) {
    const [activate, setActivate] = useState(active);
    function handleCancleClick() {
        setActivate(false);
    }

    return (
        <div
            className={clsx(style.overlay, {
                [style.overlay__active]: activate,
            })}
            onClick={handleCancleClick}
        >
            <div className={style.container}>
                <div className={style.title_container}>
                    <img src={attentionImg} alt="attention" />
                    <span>{title}</span>
                </div>
                <div className={style.content_container}>
                    <span>{content}</span>
                </div>
                <div className={style.btn_container}>
                    <div style={{ width: "48%" }}>
                        <button className="primary_btn_style_1">
                            Xác nhận
                        </button>
                    </div>
                    <div style={{ width: "48%" }}>
                        <button
                            onClick={handleCancleClick}
                            className="primary_btn_style_2"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
