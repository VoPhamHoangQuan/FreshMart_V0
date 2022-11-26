import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./phoneSigninStyle.module.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import checkedicon from "~/vendor/image/checked.png";
import invalidIcon from "~/vendor/image/error_icon.png";
import {
    fetchCreateUser,
    fetchSigninUser,
} from "~/pages/user/authentication/signinSlice";

function PhoneSignin() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [gender, setGender] = useState("male");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [infoValid, setInfoValid] = useState(false);
    const { phoneNumber, userInfo } = useSelector((state) => state.signin);

    function handleSigninSubmit(e) {
        e.preventDefault();
        dispatch(
            fetchCreateUser({
                name: name,
                gender: gender,
                password: password,
                phone: phoneNumber,
            })
        );
        dispatch(
            fetchSigninUser({
                phone: phoneNumber,
                password: password,
            })
        );
        console.log("create success");
    }

    function handleRadioClick(e) {
        setGender(e.target.value);
    }
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    useEffect(() => {
        gender !== "" && name !== "" && password !== ""
            ? setInfoValid(true)
            : setInfoValid(false);
    }, [gender, name, password]);

    useEffect(() => {
        if (userInfo.phone) {
            history("/", { replace: true });
        }
    }, [userInfo]);

    return (
        <div className="row">
            <div className="col_lg_6_12">
                <div className={style.container}>
                    <form>
                        <div className={style.title_container}>
                            <span>
                                Vui lòng bổ sung thông tin dưới đây để hoàn tất
                            </span>
                        </div>

                        <span
                            className={clsx(
                                {
                                    [style.auth_notify__error]: !infoValid,
                                },
                                style.auth_notify__active
                            )}
                        >
                            {!infoValid ? (
                                <img src={invalidIcon} alt="invalid" />
                            ) : (
                                <img src={checkedicon} alt="valid" />
                            )}
                            {!infoValid
                                ? "Yêu cầu quý khách điền đầy đủ thông tin"
                                : "Thông tin hợp lệ"}
                        </span>

                        <div className={style.input_container}>
                            <i className="fa-solid fa-venus-mars"></i>
                            <label style={{ margin: "0 4rem 0 -0.6rem" }}>
                                Danh xưng
                            </label>
                            <div className={style.input_radio}>
                                <input
                                    id="male"
                                    name="gender radio"
                                    type="radio"
                                    value="male"
                                    checked={gender === "male"}
                                    onChange={(e) => handleRadioClick(e)}
                                    // required
                                />
                                <label htmlFor="male">Anh</label>
                            </div>
                            <div className={style.input_radio}>
                                <input
                                    id="female"
                                    name="gender radio"
                                    value="female"
                                    type="radio"
                                    checked={gender === "female"}
                                    onChange={(e) => handleRadioClick(e)}
                                    // required
                                />
                                <label htmlFor="female">Chị</label>
                            </div>
                        </div>

                        <div className={style.input_container}>
                            <i className="fa-solid fa-user"></i>
                            <div className={style.input_text}>
                                <label htmlFor="userName">
                                    Họ và tên <i style={{ color: "red" }}>*</i>
                                </label>
                                <input
                                    id="userName"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    onChange={(e) => handleNameChange(e)}
                                    // required
                                />
                            </div>
                        </div>

                        <div className={style.input_container}>
                            <i className="fa-solid fa-key"></i>{" "}
                            <div className={style.input_text}>
                                <label htmlFor="userPassword">
                                    Mật khẩu <i style={{ color: "red" }}>*</i>
                                </label>
                                <input
                                    id="userPassword"
                                    type="text"
                                    placeholder="Nhập mật khẩu mới"
                                    onChange={(e) => handlePasswordChange(e)}
                                    // required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={(e) => handleSigninSubmit(e)}
                            className={clsx(
                                style.submit_button,
                                "primary_btn_style_1"
                            )}
                        >
                            Xác nhận
                        </button>
                        <a className={style.return_link} href="/signin">
                            <i className="fa-solid fa-arrow-left" />
                            Quay lại trang đăng nhập
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PhoneSignin;
