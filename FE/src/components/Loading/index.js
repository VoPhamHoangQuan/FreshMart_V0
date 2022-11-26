import style from "./loading.module.scss";
import clsx from "clsx";

function Loading() {
    return (
        <div className={style.loading_container}>
            <i
                className={clsx(
                    "fa-solid fa-spinner fa-spin",
                    style.loading_icon
                )}
            ></i>
            <span className={style.loading_title}>Loading...</span>
        </div>
    );
}

export default Loading;
