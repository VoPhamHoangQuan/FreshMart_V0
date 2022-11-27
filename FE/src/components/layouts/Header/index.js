import clsx from "clsx";
import style from "./header.module.scss";
import logo from "~/vendor/image/logo_shop.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import signinSlice from "~/pages/user/authentication/signinSlice";

function Header() {
    const cartItemsLocal = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : null;

    const userInfoLocal = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    const [cartActive, setCartActive] = useState(false);
    const { cartItems } = useSelector((state) => state.cartInfo);
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        cartItemsLocal != null ? setCartActive(true) : setCartActive(false);
    }, [cartItems, cartItemsLocal]);

    function handleUserSectionClick() {
        document
            .getElementById("userMenu")
            .classList.toggle(style.user_actionList__active);
    }

    function handleLogoutClick() {
        setCartActive(false);
        dispatch(signinSlice.actions.signOut());
        history("/", { replace: false });
    }
    return (
        <div className={style.Header_container}>
            <div className={style.Header_slogan}>
                <span>Nhanh chóng - Tiện lợi - An toàn</span>
            </div>

            <div className={style.Header_bar}>
                <div
                    className={clsx(
                        "container_lg col_lg_10_12",
                        style.Header_contents
                    )}
                >
                    <Link className={style.Header_logo_link} to={`/`}>
                        <img
                            className={style.Header_logo}
                            src={logo}
                            alt="shop logo"
                        />
                    </Link>

                    {/* <div className={style.Header_addressContainer}>
                        <i className="fas fa-map-marker-alt"></i>
                        <p className={style.Header_address}>
                            Giao tại: Q. Tân Phú, P. Hòa Thạnh, TPHCM
                        </p>
                    </div> */}

                    <div className={style.Header_searchBar}>
                        <input
                            className={style.Header_searchInput}
                            placeholder="Tìm kiếm thông tin sản phẩm"
                        />
                        <i
                            className={`fas fa-search ${style.Header_searchIcon}`}
                        ></i>
                    </div>

                    <div className={style.Header_actionContainer}>
                        <ul className={style.Header_actionList}>
                            {userInfoLocal ? (
                                <Link to="#">
                                    <li className={clsx(style.Header_action)}>
                                        <div
                                            className={style.user_section}
                                            onClick={handleUserSectionClick}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Ed_Sheeran_2013.jpg/640px-Ed_Sheeran_2013.jpg"
                                                alt="user img"
                                                className={style.user_image}
                                            />
                                            <span className={style.user_name}>
                                                {userInfoLocal.gender === "male"
                                                    ? `Anh ${userInfoLocal.name}`
                                                    : `Chị ${userInfoLocal.name}`}
                                            </span>
                                            <ul
                                                className={
                                                    style.user_actionList
                                                }
                                                id="userMenu"
                                            >
                                                <li
                                                    className={
                                                        style.user_action
                                                    }
                                                >
                                                    Đơn hàng
                                                    <i className="fa-solid fa-square-up-right"></i>
                                                </li>
                                                <li
                                                    className={
                                                        style.user_action
                                                    }
                                                >
                                                    Thông tin cá nhân
                                                    <i className="fa-solid fa-square-up-right"></i>
                                                </li>
                                                <li
                                                    className={
                                                        style.user_action
                                                    }
                                                    onClick={handleLogoutClick}
                                                >
                                                    Đăng xuất
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </Link>
                            ) : (
                                <a href="/signin">
                                    <li className={clsx(style.Header_action)}>
                                        <i className="far fa-user"></i>
                                    </li>
                                </a>
                            )}

                            <Link to="/cart">
                                <li
                                    className={clsx(style.Header_action, {
                                        [style.Header_action__active]:
                                            cartActive,
                                    })}
                                >
                                    <i className="fa fa-opencart shopping_cart_icon"></i>
                                    {cartActive ? (
                                        <span>{cartItemsLocal.length}</span>
                                    ) : (
                                        <></>
                                    )}
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
