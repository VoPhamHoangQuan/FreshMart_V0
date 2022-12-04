import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./passEnteringStyle.module.scss";
import checkedicon from "~/vendor/image/checked.png";
import invalidIcon from "~/vendor/image/error_icon.png";
import authCodeIcon from "~/vendor/image/authCode.png";
import Notify from "~/components/popupComponents/Notify";
import signinSlice, {
    fetchSigninUser,
} from "~/pages/user/authentication/signinSlice";

function PassEntering() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const passInput = useRef();
    const [pass, setPass] = useState("");
    const [passValid, setPassValid] = useState(false);
    const { phoneNumber, userInfo, error } = useSelector(
        (state) => state.signin
    );

    function handlePassChange(e) {
        setPass(e.target.value);
    }

    function handleToggleHidePass() {
        passInput.current.type === "password"
            ? (passInput.current.type = "text")
            : (passInput.current.type = "password");
    }

    function notifyCallback() {
        dispatch(signinSlice.actions.refreshError());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(fetchSigninUser({ phone: phoneNumber, password: pass }));
    }

    useEffect(() => {
        !pass ? setPassValid(false) : setPassValid(true);
    }, [pass, passValid]);

    useEffect(() => {
        if (userInfo.phone) {
            history("/", { replace: true });
        }
    }, [userInfo]);

    return (
        <div className="row">
            {error !== "" ? (
                <Notify message={error} callback={notifyCallback}></Notify>
            ) : (
                <></>
            )}

            <div className={clsx("col_lg_6_12", style.container)}>
                <form>
                    <div className={style.title_container}>
                        <span>Nhập mật khẩu của quý khách</span>
                    </div>

                    <span
                        className={clsx(
                            { [style.auth_notify__active]: passValid },
                            { [style.auth_notify__error]: !passValid }
                        )}
                    >
                        {passValid ? (
                            <img src={checkedicon} alt="valid" />
                        ) : (
                            <img src={invalidIcon} alt="invalid" />
                        )}
                        {passValid
                            ? "Mật khẩu hợp lệ"
                            : "Mật khẩu không hợp lệ !"}
                    </span>

                    <div className={style.input_container}>
                        <img src={authCodeIcon} alt="auth code" />
                        <input
                            ref={passInput}
                            type="password"
                            placeholder="Nhập mật khẩu tại đây"
                            onChange={handlePassChange}
                        />
                        <i
                            className="fa-regular fa-eye"
                            onClick={handleToggleHidePass}
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className={clsx(
                            style.authSubmit_button,
                            "primary_btn_style_1"
                        )}
                    >
                        Tiếp tục
                    </button>
                    <Link className={style.return_link} to="/signin">
                        <i className="fa-solid fa-arrow-left" />
                        Quay lại trang đăng nhập
                    </Link>
                    <div id="catchaVerifier"></div>
                </form>
            </div>
        </div>
    );
}

export default PassEntering;
