import React from "react";
import style from "./notifyStyle.module.scss";
import notifyImg from "~/vendor/image/notidy_image.png";
export default function Notify(props) {
    function handleClick() {
        document
            .getElementById("notifyPopUp")
            .classList.toggle(style.layer__disActive);
        if (props.callback) {
            props.callback();
        }
    }

    return (
        <div id="notifyPopUp" className={style.layer}>
            <div className={style.container}>
                <img src={notifyImg} alt="notify img" />
                <div className={style.content}>
                    <span>{props.message}</span>
                    <div className={style.confirm_btn}>
                        <button
                            onClick={handleClick}
                            className="primary_btn_style_1"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
