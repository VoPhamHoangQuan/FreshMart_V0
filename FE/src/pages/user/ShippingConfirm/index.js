import React from "react";
import BreadCrumb from "~/components/BreadCrumb";
import ShippingDetailsConfirm from "~/components/shippingComponents/ShippingDetailsConfirm";
export default function ShippingConfirm() {
    return (
        <>
            <div className="row">
                <div className="col_lg_8_12">
                    <BreadCrumb
                        directionMap={[
                            {
                                pageName: "Giỏ hàng",
                                currentPage: false,
                                pageSource: "cart",
                            },
                            {
                                pageName: "Thông tin giao hàng",
                                currentPage: false,
                                pageSource: "shippingInfo",
                            },
                            {
                                pageName: "Xác nhận đặt hàng",
                                currentPage: true,
                            },
                        ]}
                    />
                </div>
            </div>
            <ShippingDetailsConfirm></ShippingDetailsConfirm>
        </>
    );
}
