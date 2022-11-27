import clsx from "clsx";
import style from "./footer.module.scss";
import paypalLogo from "~/vendor/image/paypal-logo.png";
import momoLogo from "~/vendor/image/momo-logo.png";

function Footer() {
    return (
        <div className={style.Footer_container}>
            <div className={clsx("container_lg", style.Footer_content)}>
                <div className={clsx(style.Footer_col3, "mt-3")}>
                    <h1 className={style.Footer_title}>Thông tin trang web</h1>
                    <ul className={style.Footer_descriptList}>
                        <li>
                            <p className={style.Footer_descript}>
                                Trang web được thực hiện bỡi nhóm sinh viên đại
                                học Sư Phạm Kỹ Thuật TPHCM.
                            </p>
                        </li>

                        <li>
                            <p className={style.Footer_descript}>
                                Mục tiêu hướng tới thực hiện việc buôn bán và
                                quản lý hàng hóa là thực phẩm.
                            </p>
                        </li>

                        <li>
                            <p className={style.Footer_descript}>
                                Địa chỉ: 30 Hòa Bình, P.Hòa Thạnh, Q.Tân Phú,
                                TPHCM
                            </p>
                        </li>
                    </ul>
                </div>

                <div className={clsx(style.Footer_col3, "mt-3")}>
                    <h1 className={style.Footer_title}>Chức năng chính</h1>
                    <ul className={style.Footer_descriptList}>
                        <li>
                            <p className={style.Footer_descript}>
                                Xem thông tin sản phẩm, đặt hàng và thanh toán
                                online.
                            </p>
                        </li>

                        <li>
                            <p className={style.Footer_descript}>
                                CRUD thông tin tài khoản khách hàng (xóa mềm)
                            </p>
                        </li>

                        <li>
                            <p className={style.Footer_descript}>
                                CRUD thông tin sản phẩm
                            </p>
                        </li>
                        <li>
                            <p className={style.Footer_descript}>
                                Nhập kho và xuất kho
                            </p>
                        </li>
                        <li>
                            <p className={style.Footer_descript}>
                                Hệ thống giao tiếp hỗ trợ khách hàng
                            </p>
                        </li>
                    </ul>
                </div>

                <div className={clsx(style.Footer_col3, "mt-3")}>
                    <div>
                        <h1 className={style.Footer_title}>
                            Theo dõi chúng tôi tại
                        </h1>
                        <ul className={style.Footer_social}>
                            <a
                                href="https://www.facebook.com"
                                className={style.Footer_socialLink}
                            >
                                <li>
                                    <i className="fa fa-facebook-f"></i>
                                </li>
                            </a>
                            <a
                                href="https://www.instagram.com"
                                className={style.Footer_socialLink}
                            >
                                <li>
                                    <i className="fa fa-instagram"></i>
                                </li>
                            </a>
                            <a
                                href="https://twitter.com/?lang=vi"
                                className={style.Footer_socialLink}
                            >
                                <li>
                                    <i className="fa fa-twitter"></i>
                                </li>
                            </a>
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h1 className={style.Footer_title}>
                            Phương thức thanh toán
                        </h1>
                        <ul className={style.Footer_payment}>
                            <li
                                className={clsx(
                                    style.Footer_paymentItem,
                                    "mr-1"
                                )}
                            >
                                <img
                                    src={paypalLogo}
                                    alt="paypal logo"
                                    className={style.Footer_paymentLogo}
                                />
                            </li>

                            <li className={style.Footer_paymentItem}>
                                <img
                                    src={momoLogo}
                                    alt="momo logo"
                                    className={style.Footer_paymentLogo}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.Footer_sign}>
                <h3 className={style.Footer_signTitle}>
                    Powered By{" "}
                    <a className={style.Footer_signLink} href="/">
                        Fresh Mart
                    </a>{" "}
                    © 2022
                </h3>
            </div>
        </div>
    );
}
export default Footer;
