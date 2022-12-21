import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./shippingDetails.module.scss";
import paypalIcon from "~/vendor/image/paypal-logo.png";
import momoIcon from "~/vendor/image/momo-logo.png";
import cashIcon from "~/vendor/image/cash-logo.png";
import checkIcon from "~/vendor/image/checked.png";
import uncheckIcon from "~/vendor/image/unchecked.png";
import { numberWithCommas } from "~/vendor/js";
import shippingInfoSlice, {
    fetchVNProvince,
    fetchVNDistrict,
    fetchVNWard,
    fetchShippingService,
    fetchShippingFee,
} from "~/pages/user/ShippingInfo/shippingInfoSlice";

export default function ShippingDetails() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const phoneNumberInput = useRef();
    const [provinceInfo, setProvinceInfo] = useState({});
    const [districtInfo, setDistrictInfo] = useState({});
    const [wardInfo, setWardInfo] = useState({});
    const [streetInfo, setstreetInfo] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [shippingPhone, setShippingPhone] = useState("");
    const [validateInfo, setValidateInfo] = useState(false);
    const { VNProvince, VNDistrict, VNWard, serviceType, shippingFee } =
        useSelector((state) => state.shippingInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const cartEmpty = cartItems == null;
    const totalProductPrice = !cartEmpty
        ? cartItems.reduce(
              (total, product) =>
                  (total += product.primaryPrice * parseInt(product.qty)),
              0
          )
        : 0;
    function forceAuthentication(userInfo, cartItems) {
        if (!userInfo) {
            history("/signin");
        } else if (!cartItems) {
            history("/cart");
        }
    }

    function formatPhoneNumber(phoneNumber) {
        const regionNumber = "+84";
        const formatedPhoneNumber =
            regionNumber + phoneNumber.toString().slice(1, 11);
        return formatedPhoneNumber;
    }
    function reverseFormatPhoneNumber(phoneNumber) {
        const regionNumber = "0";
        const reverseFormatedPhoneNumber =
            regionNumber + phoneNumber.toString().slice(3, 13);
        return reverseFormatedPhoneNumber;
    }

    function handlePhoneNumberKeyPress(e) {
        !/[0-9]/.test(e.key) && e.preventDefault();
    }

    function handleProviceSelected(e) {
        const [provinceId, provinceName] = e.target.value.split(",");
        setProvinceInfo({ provinceId: provinceId, provinceName: provinceName });
        dispatch(fetchVNDistrict(parseInt(provinceId)));
    }

    function handleDistrictSelected(e) {
        const [districtId, districtName] = e.target.value.split(",");
        setDistrictInfo({ districtId: districtId, districtName: districtName });
        dispatch(fetchVNWard(parseInt(districtId)));
        dispatch(fetchShippingService(parseInt(districtId))); //get type of shipping service
    }

    function handleWardSelected(e) {
        const [wardCode, wardName] = e.target.value.split(",");
        setWardInfo({ wardCode: wardCode, wardName: wardName });
        // caculate shipping fee
        dispatch(
            fetchShippingFee({
                serviceId: parseInt(serviceType[0].service_id),
                totalPrice: parseInt(totalProductPrice),
                districtId: parseInt(districtInfo.districtId),
                wardCode: wardCode,
            })
        );
    }

    function handleStreetInput(e) {
        setstreetInfo(e.target.value);
    }

    function handlePaymentChange(e) {
        setPaymentMethod(e.target.value);
    }

    function handlePhoneNumberChange(e) {
        setShippingPhone(e.target.value);
    }

    function handleSubmit() {
        const shippingInformation = {
            customerName: userInfo.name,
            customerGender: userInfo.gender,
            customerPhone: userInfo.phone,
            shippingPhone: formatPhoneNumber(shippingPhone),
            shippingAddress: `${streetInfo}, ${wardInfo.wardName}, ${districtInfo.districtName}, Tỉnh/Thành Phố ${provinceInfo.provinceName}`,
            paymentMethod: paymentMethod,
            productPrice: totalProductPrice,
            shippingPrice: shippingFee.total,
        };
        dispatch(
            shippingInfoSlice.actions.setShippingInfomation(shippingInformation)
        );

        history("/shippingConfirm");
    }

    useEffect(() => {
        dispatch(fetchVNProvince());
    }, []);

    useEffect(() => {
        forceAuthentication(userInfo, cartItems);
    });

    useEffect(() => {
        provinceInfo &&
        districtInfo &&
        wardInfo !== {} &&
        streetInfo !== "" &&
        paymentMethod != "" &&
        shippingPhone !== ""
            ? setValidateInfo(true)
            : setValidateInfo(false);
    }, [
        provinceInfo,
        districtInfo,
        wardInfo,
        streetInfo,
        paymentMethod,
        shippingPhone,
    ]);

    return (
        <div className="row mt-1 mb-1">
            {userInfo ? (
                <div className="col_lg_6_12">
                    <div className={style.container}>
                        <div className={style.info_container}>
                            <span className={style.title}>
                                1. Thông tin người mua hàng
                            </span>
                            <div className={style.radioType_container}>
                                <div className={style.gender}>
                                    {userInfo && userInfo.gender === "male" ? (
                                        <img
                                            src={checkIcon}
                                            alt="checked"
                                            className={style.genderIcon}
                                        />
                                    ) : (
                                        <img
                                            src={uncheckIcon}
                                            alt="checked"
                                            className={style.genderIcon}
                                        />
                                    )}
                                    <label>Anh</label>
                                </div>
                                <div className={style.gender}>
                                    {userInfo &&
                                    userInfo.gender === "female" ? (
                                        <img
                                            src={checkIcon}
                                            alt="checked"
                                            className={style.genderIcon}
                                        />
                                    ) : (
                                        <img
                                            src={uncheckIcon}
                                            alt="checked"
                                            className={style.genderIcon}
                                        />
                                    )}

                                    <label>Chị</label>
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    style.input_container,
                                    style.input_container__inactive
                                )}
                            >
                                <span>Họ và tên</span>
                                <span>{userInfo.name}</span>
                            </div>
                            <div className={style.input_container}>
                                <span>
                                    Số điện thoại giao hàng (mặc định sử dụng số
                                    điện thoại tài khoản nếu để trống mục này)
                                </span>
                                <input
                                    ref={phoneNumberInput}
                                    type="tel"
                                    maxLength={10}
                                    placeholder={reverseFormatPhoneNumber(
                                        userInfo.phone
                                    )}
                                    value={shippingPhone}
                                    onChange={(e) => handlePhoneNumberChange(e)}
                                    onKeyPress={(e) =>
                                        handlePhoneNumberKeyPress(e)
                                    }
                                />
                            </div>
                        </div>

                        <div className={style.info_container}>
                            <span className={style.title}>
                                2. Địa chỉ nhận hàng
                            </span>
                            <span className={style.subTitle}>
                                Tỉnh thành <i style={{ color: "red" }}>*</i>
                            </span>
                            <select
                                className={style.selectInput}
                                onChange={(e) => handleProviceSelected(e)}
                            >
                                {VNProvince ? (
                                    VNProvince.map((el, id) => (
                                        <option
                                            key={id}
                                            value={[
                                                el.ProvinceID,
                                                el.ProvinceName,
                                            ]}
                                        >
                                            {el.ProvinceName}
                                        </option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </select>
                            <span className={style.subTitle}>
                                Quận <i style={{ color: "red" }}>*</i>
                            </span>
                            <select
                                className={style.selectInput}
                                onChange={(e) => handleDistrictSelected(e)}
                            >
                                {VNDistrict ? (
                                    VNDistrict.map((el, id) => (
                                        <option
                                            key={id}
                                            value={[
                                                el.DistrictID,
                                                el.DistrictName,
                                            ]}
                                        >
                                            {el.DistrictName}
                                        </option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </select>
                            <span className={style.subTitle}>
                                Phường <i style={{ color: "red" }}>*</i>
                            </span>
                            <select
                                className={style.selectInput}
                                onChange={(e) => handleWardSelected(e)}
                            >
                                {VNWard ? (
                                    VNWard.map((el, id) => (
                                        <option
                                            key={id}
                                            value={[el.wardCode, el.WardName]}
                                        >
                                            {el.WardName}
                                        </option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </select>
                            <span className={style.subTitle}>
                                Địa chỉ <i style={{ color: "red" }}>*</i>
                            </span>
                            <input
                                className={style.typeInput}
                                name="streetName"
                                placeholder="Nhập số nhà và tên đường"
                                value={streetInfo}
                                onChange={(e) => handleStreetInput(e)}
                            />
                        </div>

                        <form className={style.info_container}>
                            <span className={style.title}>
                                3. Phương thức thanh toán
                            </span>
                            <div className={style.checkBtn_container}>
                                <label
                                    htmlFor="paypal"
                                    className={style.paymentIcon_container}
                                >
                                    <img src={paypalIcon} alt="paypal" />
                                    <span>PayPal</span>
                                </label>
                                <input
                                    name="paymentMethod"
                                    type="radio"
                                    id="paypal"
                                    value="paypal"
                                    onChange={(e) => handlePaymentChange(e)}
                                />
                            </div>

                            {/* <div className={style.checkBtn_container}>
                                <label
                                    htmlFor="momo"
                                    className={style.paymentIcon_container}
                                >
                                    <img src={momoIcon} alt="momo" />
                                    <span>MoMo</span>
                                </label>
                                <input
                                    name="paymentMethod"
                                    type="radio"
                                    id="momo"
                                    value="momo"
                                    onChange={(e) => handlePaymentChange(e)}
                                />
                            </div> */}

                            <div className={style.checkBtn_container}>
                                <label
                                    htmlFor="cash"
                                    className={style.paymentIcon_container}
                                >
                                    <img src={cashIcon} alt="cash" />
                                    <span>Thanh toán khi nhận hàng</span>
                                </label>
                                <input
                                    name="paymentMethod"
                                    type="radio"
                                    id="cash"
                                    value="cash"
                                    onChange={(e) => handlePaymentChange(e)}
                                />
                            </div>
                        </form>

                        <div className={style.price_summary}>
                            <div className={style.total_price_container}>
                                <span>Tiền hàng</span>
                                <span className={style.price}>
                                    {numberWithCommas(totalProductPrice)}
                                    <span>đ</span>
                                </span>
                            </div>
                            <div className={style.total_price_container}>
                                <span>Phí giao hàng</span>
                                <span className={style.price}>
                                    {numberWithCommas(
                                        shippingFee.total
                                            ? shippingFee.total
                                            : 0
                                    )}
                                    <span>đ</span>
                                </span>
                            </div>
                            <div className={style.total_price_container}>
                                <span>Tổng chi phí</span>
                                <span className={style.price}>
                                    {numberWithCommas(
                                        totalProductPrice +
                                            (shippingFee.total
                                                ? shippingFee.total
                                                : 0)
                                    )}
                                    <span>đ</span>
                                </span>
                            </div>
                            <div className={style.continue_btn_container}>
                                <button
                                    disabled={!validateInfo ? true : false}
                                    className={clsx(
                                        { primary_btn_style_1: validateInfo },
                                        {
                                            primary_btn_style_1__inActive:
                                                !validateInfo,
                                        }
                                    )}
                                    onClick={handleSubmit}
                                >
                                    Tiếp tục
                                </button>
                                <Link className={style.return_link} to="/cart">
                                    <i className="fa-solid fa-arrow-left" />
                                    Quay lại giỏ hàng
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
