import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "~/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import style from "./otpStyle.module.scss";
import checkedicon from "~/vendor/image/checked.png";
import invalidIcon from "~/vendor/image/error_icon.png";
import authCodeIcon from "~/vendor/image/authCode.png";
import { fetchExistedPhone } from "~/pages/user/authentication/signinSlice";

function Otp() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { phoneNumber, existedPhone } = useSelector((state) => state.signin);
    const [otpCode, setOtpCode] = useState("");
    const [otpCodeInvalid, setOtpCodeInvalid] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [otpExpired, setOtpExpired] = useState(false);
    const [authCodeSubmitBtnInvalid, setauthCodeSubmitBtnInvalid] =
        useState(true);
    const confirmationResult = window.confirmationResult;

    function handleOtpCodeOnKeyPress(e) {
        !/[0-9]/.test(e.key) && e.preventDefault();
    }

    function handleOtpCodeChange(e) {
        setOtpCode(e.target.value);
    }

    const captchaGenerator = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "catchaVerifier",
            {
                size: "invisible",
                "expired-callback": () => {
                    setOtpError(
                        "Mã OTP đã quá hạn, vui lòng đợi 3 phút sau và thử lại"
                    );
                    setOtpExpired(true);
                    console.log("OTP expire");
                },
            },
            auth
        );
    };

    const otpSender = async (auth, phoneNumber, captchaGenerator) => {
        await signInWithPhoneNumber(auth, phoneNumber, captchaGenerator)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setOtpError("");
                console.log("OTP send");
            })
            .catch((err) => {
                setOtpError(
                    "Mã OTP đã quá hạn, vui lòng đợi 3 phút sau và thử lại"
                );
                setOtpExpired(true);
                console.log("OTP not send: " + err);
            });
    };

    const otpVerifier = async (confirmationResult, otpCode) => {
        await confirmationResult
            .confirm(otpCode)
            .then((result) => {
                // User signed in successfully.
                setOtpError("");
                setauthCodeSubmitBtnInvalid(false);
                const user = result.user;
                console.log("verify success");
            })
            .catch((error) => {
                setOtpError("Mã OTP vừa nhập không đúng");
                setauthCodeSubmitBtnInvalid(true);
                console.log("verify fail");
            });
    };

    async function handleAuthCodeSubmit(e) {
        e.preventDefault();
        await dispatch(fetchExistedPhone(phoneNumber));
    }

    useEffect(() => {
        if (otpCode.length < 6 && otpCode.length !== 0) {
            setOtpCodeInvalid(true);
            setauthCodeSubmitBtnInvalid(true);
        } else if (otpCode.length === 0) {
            setOtpCodeInvalid(false);
            setauthCodeSubmitBtnInvalid(true);
        } else {
            setOtpCodeInvalid(false);
            setauthCodeSubmitBtnInvalid(false);
            otpVerifier(confirmationResult, otpCode);
        }
    }, [otpCode]);

    useEffect(() => {
        captchaGenerator();
        let recaptchaVerifier = window.recaptchaVerifier;
        otpSender(auth, phoneNumber, recaptchaVerifier);
    }, []);

    useEffect(() => {
        if (existedPhone.existed === false) {
            history("./phoneSigninInfo", { replace: true });
        } else if (existedPhone.existed) {
            history("./passEntering", { replace: true });
        }
    }, [existedPhone.existed]);

    return (
        <div className="row">
            <div className={clsx("col_lg_6_12", style.container)}>
                <form>
                    <div className={style.title_container}>
                        <span>Nhập mã OTP tại đây</span>
                    </div>
                    {otpCodeInvalid ? (
                        <span className={style.auth_notify__error}>
                            <img src={invalidIcon} alt="error" />
                            Mã OTP không hợp lệ (Ít nhất 6 số)
                        </span>
                    ) : otpError !== "" ? (
                        <span className={style.auth_notify__error}>
                            <img src={invalidIcon} alt="error" />
                            {otpError}
                        </span>
                    ) : otpError === "" && otpCode.length !== 0 ? (
                        <span className={style.auth_notify__active}>
                            <img src={checkedicon} alt="checked" />
                            Mã OTP khớp
                        </span>
                    ) : (
                        <span className={style.auth_notify__active}>
                            <img src={checkedicon} alt="checked" />
                            Mã OTP đã được gửi đến điện thoại của quý khách
                        </span>
                    )}
                    {!otpExpired && (
                        <div className={style.input_container}>
                            <img src={authCodeIcon} alt="auth code" />
                            <input
                                id="authCodeInput"
                                type="text"
                                placeholder="Nhập mã OTP"
                                maxLength={6}
                                onKeyPress={handleOtpCodeOnKeyPress}
                                onChange={handleOtpCodeChange}
                                // required
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        onClick={handleAuthCodeSubmit}
                        disabled={authCodeSubmitBtnInvalid}
                        className={clsx(
                            style.authCodeSubmit_button,
                            {
                                [style.authCodeSubmit_button__invalid]:
                                    authCodeSubmitBtnInvalid,
                            },
                            "primary_btn_style_1"
                        )}
                    >
                        Tiếp tục
                    </button>
                    <a className={style.return_link} href="/signin">
                        <i className="fa-solid fa-arrow-left" />
                        Quay lại trang đăng nhập
                    </a>
                </form>
            </div>
        </div>
    );
}

export default Otp;
