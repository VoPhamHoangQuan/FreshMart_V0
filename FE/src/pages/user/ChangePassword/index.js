import React, { useEffect, useRef, useState } from "react";
import style from "./changePassword.module.scss";
import BreadCrumb from "~/components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchComparePassword,
    fetchUpdatePassUser,
} from "./changePasswordSlice";
import { async } from "@firebase/util";

export default function ChangePassword() {
    const dispatch = useDispatch();
    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    const { message } = useSelector((state) => state.ChangePass);
    const passInput01 = useRef();
    const passInput02 = useRef();
    const passInput03 = useRef();
    const [oldPassInput, setOldPassInput] = useState("");
    const [newPassInput, setNewPassInput] = useState("");
    const [reNewPassInput, setReNewPassInput] = useState("");
    const [newPassMatched, setNewPassMatched] = useState(false);
    const [oldPassMatched, setOldPassMatched] = useState(false);

    function handleToggleHidePass01() {
        passInput01.current.type === "password"
            ? (passInput01.current.type = "text")
            : (passInput01.current.type = "password");
    }
    function handleToggleHidePass02() {
        passInput02.current.type === "password"
            ? (passInput02.current.type = "text")
            : (passInput02.current.type = "password");
    }
    function handleToggleHidePass03() {
        passInput03.current.type === "password"
            ? (passInput03.current.type = "text")
            : (passInput03.current.type = "password");
    }

    function handleNewPassOnChange(e) {
        setNewPassInput(e.target.value);
    }
    function handleReNewPassOnChange(e) {
        setReNewPassInput(e.target.value);
    }
    function handleOldPassOnChange(e) {
        setOldPassInput(e.target.value);
    }
    function handleConfirmClick() {
        dispatch(
            fetchComparePassword({
                phone: userInfo.phone,
                password: oldPassInput,
            })
        );
        // if (message.message === "Password correct") {
        //     console.log("Password correct");
        //     // setOldPassMatched(true);
        // }
        // if (message.message === "Password incorrect") {
        //     console.log("Password Incorrect");
        //     // setOldPassMatched(false);
        // }
        // if (oldPassMatched) {
        //     console.log("Password correct");
        // }
        // if (!oldPassMatched) {
        //     console.log("Password incorrect");
        // }
    }

    useEffect(() => {
        newPassInput === reNewPassInput &&
        newPassInput !== "" &&
        reNewPassInput !== ""
            ? setNewPassMatched(true)
            : setNewPassMatched(false);
    }, [reNewPassInput, newPassInput]);

    // useEffect(() => {
    //     if (message.message === "Password correct") {
    //         setOldPassMatched(true);
    //     }
    //     if (message.message === "Password incorrect") {
    //         setOldPassMatched(false);
    //     }
    // }, [message.message]);

    return (
        <div className="col_lg_8_10">
            <div className="row">
                <BreadCrumb
                    directionMap={[
                        {
                            pageName: "Đổi mật khẩu",
                            currentPage: true,
                        },
                    ]}
                />
            </div>
            <div className="row mt-1">
                <div className={style.container}>
                    <span className={style.title}>Đổi mật khẩu</span>
                    <div className={style.passEnter_container}>
                        <div className={style.inputContainer}>
                            <input
                                ref={passInput01}
                                type="password"
                                placeholder="Nhập mật khẩu cũ"
                                onChange={(e) => handleOldPassOnChange(e)}
                            ></input>
                            <i
                                className="fa-regular fa-eye"
                                onClick={handleToggleHidePass01}
                            />
                        </div>
                        <div className={style.inputContainer}>
                            <input
                                ref={passInput02}
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                onChange={(e) => handleNewPassOnChange(e)}
                            ></input>
                            <i
                                className="fa-regular fa-eye"
                                onClick={handleToggleHidePass02}
                            />
                        </div>
                        <div className={style.inputContainer}>
                            <input
                                ref={passInput03}
                                type="password"
                                placeholder="Nhập lại mật khẩu mới"
                                onChange={(e) => handleReNewPassOnChange(e)}
                            ></input>
                            <i
                                className="fa-regular fa-eye"
                                onClick={handleToggleHidePass03}
                            />
                        </div>
                    </div>

                    <div className={style.confirmBtn_container}>
                        {newPassMatched ? (
                            <button
                                className="primary_btn_style_1"
                                onClick={handleConfirmClick}
                            >
                                Xác nhận
                            </button>
                        ) : (
                            <button className="primary_btn_style_1__inActive">
                                Xác nhận
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
