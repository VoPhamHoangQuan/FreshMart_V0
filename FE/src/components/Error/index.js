import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./error.module.scss";
import errorImage from "~/vendor/image/error_image.jpg";
import warningImage from "~/vendor/image/warning_image.jpg";

function Error({ type, message }) {
    const errorStyle =
        type === "danger" ? style.error_danger : style.error_warning;
    return (
        <div className={clsx(style.error_container)}>
            {type === "warning" ? (
                <div className={clsx(style.error_item, errorStyle)}>
                    {/* <i
                        className={clsx(
                            "fa-solid fa-circle-exclamation",
                            style.error_icon
                        )}
                    ></i> */}
                    <img src={warningImage} alt="error" />
                    <div className={style.error_message_container}>
                        <span className={clsx(style.error_message, "mt-3")}>
                            {message}
                        </span>
                        <Link
                            className={clsx(
                                style.error_link,
                                style.error_link__warning,
                                "mt-4"
                            )}
                            to={"/"}
                        >
                            Xác nhận
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={clsx(style.error_item, errorStyle)}>
                    <img src={errorImage} alt="error" />
                    <div className={style.error_message_container}>
                        <span className={clsx(style.error_message, "mt-3")}>
                            {message}
                        </span>
                        <a
                            className={clsx(
                                style.error_link,
                                style.error_link__danger,
                                "mt-4"
                            )}
                            href={"/"}
                        >
                            Trang chủ
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Error;
