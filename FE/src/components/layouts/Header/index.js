import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./header.module.scss";
import logo from "~/vendor/image/logo_shop.png";
import defaultUserImg from "~/vendor/image/default_user_image.png";
import signinSlice from "~/pages/user/authentication/signinSlice";
import PopUpCartProduct from "~/components/productComponents/PopUpCartProduct";
import {
    fetchProductListBySearch,
    fetchProductList,
} from "~/pages/user/HomeUser/homeUserSlide";

function Header() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const cartItemsLocal = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

    const userInfoLocal = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    const { cartItems } = useSelector((state) => state.cartInfo);
    const [cartActive, setCartActive] = useState(false);
    const [popUpActive, setPopUpActive] = useState(false);
    const [searchString, setSearchString] = useState("");

    function handleHomeLogoClick() {
        dispatch(fetchProductList());
    }

    function handleSearchChange(e) {
        setSearchString(e.target.value);
    }

    function handleSearchClick() {
        if (searchString !== "") {
            dispatch(fetchProductListBySearch({ key: searchString }));
            history("/");
        } else {
            dispatch(fetchProductList());
            history("/");
        }
    }

    function handleLogoutClick() {
        setCartActive(false);
        dispatch(signinSlice.actions.signOut());
        history("/", { replace: false });
    }

    function handleUserOrderClick() {
        history(`/user/orderList`);
    }
    function handleUserProfileClick() {
        history(`/user/userProfile`);
    }

    function handleMouseOver() {
        setPopUpActive(true);
    }

    function handleMouseLeave() {
        setPopUpActive(false);
    }

    useEffect(() => {
        cartItemsLocal !== null && cartItemsLocal.length !== 0
            ? setCartActive(true)
            : setCartActive(false);
    }, [cartItemsLocal, cartItems]);
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
                    <Link
                        className={style.Header_logo_link}
                        to={`/`}
                        onClick={handleHomeLogoClick}
                    >
                        <img
                            className={style.Header_logo}
                            src={logo}
                            alt="shop logo"
                        />
                    </Link>

                    <div className={style.Header_searchBar}>
                        <input
                            className={style.Header_searchInput}
                            value={searchString}
                            onChange={(e) => handleSearchChange(e)}
                            placeholder="Tìm kiếm thông tin sản phẩm"
                        />
                        <i
                            className={`fas fa-search ${style.Header_searchIcon}`}
                            onClick={handleSearchClick}
                        ></i>
                    </div>

                    <div className={style.Header_actionContainer}>
                        <ul className={style.Header_actionList}>
                            {userInfoLocal ? (
                                <li className={clsx(style.Header_action)}>
                                    <div
                                        className={clsx(
                                            style.user_section,
                                            style.userPopUpActive
                                        )}
                                    >
                                        <img
                                            src={
                                                userInfoLocal.image
                                                    ? userInfoLocal.image
                                                    : defaultUserImg
                                            }
                                            alt="user img"
                                            className={style.user_image}
                                        />

                                        <span className={style.user_name}>
                                            {userInfoLocal.gender === "male"
                                                ? `Anh ${userInfoLocal.name}`
                                                : `Chị ${userInfoLocal.name}`}
                                        </span>

                                        <ul className={style.user_actionList}>
                                            <li
                                                className={style.user_action}
                                                onClick={handleUserOrderClick}
                                            >
                                                Đơn hàng
                                                <i className="fa-solid fa-square-up-right"></i>
                                            </li>
                                            <li
                                                className={style.user_action}
                                                onClick={handleUserProfileClick}
                                            >
                                                Thông tin cá nhân
                                                <i className="fa-solid fa-square-up-right"></i>
                                            </li>
                                            <li
                                                className={style.user_action}
                                                onClick={handleLogoutClick}
                                            >
                                                Đăng xuất
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ) : (
                                <a href="/signin">
                                    <li className={clsx(style.Header_action)}>
                                        <i className="far fa-user"></i>
                                    </li>
                                </a>
                            )}
                            <div
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                                className={style.cartPopUpActive}
                            >
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
                                {popUpActive && (
                                    <PopUpCartProduct
                                        cartItems={cartItemsLocal}
                                    ></PopUpCartProduct>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
