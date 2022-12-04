import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "~/components/BreadCrumb";
import OrderDetail from "~/components/orderComponents/OrderDetail";
import Loading from "~/components/Loading";
import Error from "~/components/popupComponents/Error";
import { fetchOrderDetail } from "~/pages/user/OrderInfo/orderInfoSlice";

export default function OrderInfo() {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.orderInfo);
    const params = useParams();
    const orderId = params.orderId;

    useEffect(() => {
        const fetchOrderData = async () =>
            await dispatch(fetchOrderDetail({ orderId: orderId }));
        fetchOrderData();
    }, [orderId, dispatch]);

    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : error !== "" ? (
                <Error type="danger" message={error}></Error>
            ) : (
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
            )}
        </>
    );
}
