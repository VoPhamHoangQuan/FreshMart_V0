import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import style from "./userSidebarStyle.module.scss";
import defaultUserImg from "~/vendor/image/default_user_image.png";
import signinSlice from "~/pages/user/authentication/signinSlice";
import { useDispatch } from "react-redux";

export default function UserSidebar() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    function handleLogoutClick() {
        dispatch(signinSlice.actions.signOut());
        history("/", { replace: false });
    }

    return (
        <div className="col_lg_2_10">
            <div className={clsx("row mt-1", style.container)}>
                {userInfo ? (
                    <div className={style.userInfo_container}>
                        <div className={style.userImage_container}>
                            <img
                                src={
                                    userInfo.image
                                        ? userInfo.image
                                        : defaultUserImg
                                }
                                alt="default user"
                            ></img>
                        </div>
                        <div className={style.userInfo_container}>
                            <span className={style.name}>
                                {userInfo.gender === "male"
                                    ? `Anh ${userInfo.name}`
                                    : `Chị ${userInfo.name}`}
                            </span>
                            <Link
                                to="/user/userProfile"
                                className={style.editProfileLink}
                            >
                                <span>
                                    <i className="fa-solid fa-pen"></i>
                                    Sửa hồ sơ
                                </span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className={style.userControls_container}>
                    <Link
                        to="/user/userProfile"
                        className={style.control_container}
                    >
                        <i className="fa-regular fa-user"></i>
                        <span>Tài khoản của tôi</span>
                    </Link>
                    <Link
                        to="/user/orderList"
                        className={style.control_container}
                    >
                        <i
                            style={{ color: "#efbc44" }}
                            className="fa-regular fa-money-bill-1"
                        ></i>
                        <span>Đơn đã đặt</span>
                    </Link>
                    {/* <Link to="/" className={style.control_container}>
                        <i
                            style={{ color: "#0346ae" }}
                            className="fa-solid fa-shield-halved"
                        ></i>
                        <span>Đổi mật khẩu</span>
                    </Link> */}
                    <Link
                        to="#"
                        onClick={handleLogoutClick}
                        className={style.control_container}
                    >
                        <i
                            style={{ color: "#ee6c4d" }}
                            className="fa-solid fa-door-open"
                        ></i>
                        <span>Đăng xuất</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
