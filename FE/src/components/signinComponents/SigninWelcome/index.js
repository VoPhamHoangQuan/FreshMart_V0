import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import style from "./signinWelcomeStyle.module.scss";
import facebookIcon from "~/vendor/image/facebook.png";
import googleIcon from "~/vendor/image/google.png";
import signinSlice from "~/pages/user/authentication/signinSlice";

function SigninWelcome() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const signinState = useSelector((state) => state.signin);
    const phoneNumberInput = useRef();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneInvalid, setPhoneInvalid] = useState(false);
    const [signinBtnDisable, setSigninBtnDisable] = useState(true);
    const [phoneNumberInProcess, setPhoneNumberInProcess] = useState(false);

    function formatPhoneNumber(phoneNumber) {
        const regionNumber = "+84";
        const formatedPhoneNumber =
            regionNumber + phoneNumber.toString().slice(1, 11);
        return formatedPhoneNumber;
    }

    function handlePhoneNumberKeyPress(e) {
        !/[0-9]/.test(e.key) && e.preventDefault();
    }

    function handlePhoneNumberChange(e) {
        setPhoneNumber(e.target.value);
    }

    function handleSigninSubmit(e) {
        e.preventDefault();
        let phoneNumber = formatPhoneNumber(phoneNumberInput.current.value);
        dispatch(signinSlice.actions.phoneGenerator(phoneNumber));
        history(`/signin/otpAuth`);
    }

    useEffect(() => {
        if (
            phoneNumber.length < 10 ||
            phoneNumber.toString().slice(0, 1) !== "0"
        ) {
            setPhoneInvalid(true);
            setSigninBtnDisable(true);
        } else if (phoneNumber.length === 0) {
            setPhoneInvalid(true);
            setSigninBtnDisable(true);
        } else {
            setPhoneInvalid(false);
            setSigninBtnDisable(false);
        }
    }, [phoneNumber]);

    useEffect(() => {
        signinState.phoneNumber !== ""
            ? setPhoneNumberInProcess(true)
            : setPhoneNumberInProcess(false);
    }, []);

    return (
        <div className={style.container}>
            <form>
                <div className={style.title_container}>
                    <span>Để tiếp tục vui lòng thực hiện xác minh</span>
                </div>
                <span
                    className={clsx(
                        {
                            [style.phone_invalid__active]:
                                phoneInvalid || phoneNumberInProcess,
                        },
                        style.phone_invalid
                    )}
                >
                    {phoneInvalid
                        ? "Số điện thoại không hợp lệ"
                        : phoneNumberInProcess
                        ? "Hãy nhấn F5 hoặc refesh lại trang để nhập số điện thoại mới"
                        : "Số điện thoại hợp lệ"}
                </span>
                <div className={style.input_container}>
                    <label htmlFor="phoneInput"></label>
                    <i className="fa-solid fa-phone"></i>
                    <input
                        id="PhoneInput"
                        ref={phoneNumberInput}
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        maxLength={10}
                        onChange={(e) => handlePhoneNumberChange(e)}
                        onKeyPress={(e) => handlePhoneNumberKeyPress(e)}
                        // required
                    />
                </div>
                <button
                    id="signPhoneFormSubmit"
                    type="submit"
                    disabled={signinBtnDisable || phoneNumberInProcess}
                    onClick={(e) => handleSigninSubmit(e)}
                    className={clsx(
                        style.signin_button,
                        {
                            [style.signin_button__disable]:
                                signinBtnDisable || phoneNumberInProcess,
                        },
                        "primary_btn_style_1"
                    )}
                >
                    Tiếp tục
                </button>
            </form>
            {/* <div className={style.social_container}>
                <div className={style.social_note}>
                    <span>Hoặc sử dụng tài khoản</span>
                </div>
                <div className={style.social_link_container}>
                    <Link
                        className={style.social_link}
                        to="/signin/socialSigninInfo"
                    >
                        <img src={facebookIcon} alt="facebook icon" />
                        <span>Facebook</span>
                    </Link>
                    <Link
                        className={style.social_link}
                        to="/signin/socialSigninInfo"
                    >
                        <img src={googleIcon} alt="google icon" />
                        <span>Google</span>
                    </Link>
                </div>
            </div> */}
        </div>
    );
}

export default SigninWelcome;
