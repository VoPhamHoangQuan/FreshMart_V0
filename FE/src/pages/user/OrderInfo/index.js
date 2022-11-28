import React from "react";
import BreadCrumb from "~/components/BreadCrumb";
import OrderDetail from "~/components/orderComponents/OrderDetail";

export default function OrderInfo() {
    return (
        <>
            <div className="row">
                <div className="col_lg_8_12">
                    <BreadCrumb
                        directionMap={[
                            {
                                pageName: "Chi tiết đơn hàng",
                                currentPage: true,
                            },
                        ]}
                    />
                </div>
            </div>
            <OrderDetail></OrderDetail>
        </>
    );
}
