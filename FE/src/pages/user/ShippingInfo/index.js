import React from "react";
import ShippingDetails from "~/components/shippingComponents/ShippingDetails";
import BreadCrumb from "~/components/BreadCrumb";
export default function ShippingInfo() {
    return (
        <>
            <div className="row">
                <div className="col_lg_6_12">
                    <BreadCrumb
                        directionMap={[
                            {
                                pageName: "Giỏ hàng",
                                currentPage: false,
                                pageSource: "cart",
                            },
                            {
                                pageName: "Thông tin giao hàng",
                                currentPage: true,
                            },
                        ]}
                    />
                </div>
            </div>
            <ShippingDetails></ShippingDetails>
        </>
    );
}
