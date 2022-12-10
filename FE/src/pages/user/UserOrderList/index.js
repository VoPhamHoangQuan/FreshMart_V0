import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrderList } from "./userOrderListSlice";
import { useNavigate } from "react-router-dom";
import UserOrder from "~/components/orderComponents/UserOrder";
import BreadCrumb from "~/components/BreadCrumb";
import EmptyNotify from "~/components/popupComponents/EmptyNotify";
import UserOrderSort from "~/components/orderComponents/UserOrderSort";
import Loading from "~/components/Loading";

export default function UserOrderList() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { userOrderList, loading } = useSelector(
        (state) => state.userOrderInfo
    );
    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    const [filterChange, setFilterChange] = useState(false);

    function forceAuthentication(userInfo) {
        if (!userInfo) {
            history("/signin");
        }
    }
    useEffect(() => {
        forceAuthentication(userInfo);
    });
    useEffect(() => {
        if (userInfo) {
            dispatch(fetchUserOrderList({ token: userInfo.token }));
        }
    }, []);
    useEffect(() => {}, [userOrderList]);

    return (
        <div className="col_lg_8_10">
            <BreadCrumb
                directionMap={[
                    {
                        pageName: "Danh sách đơn hàng",
                        currentPage: true,
                    },
                ]}
            />
            <UserOrderSort userInfo={userInfo}></UserOrderSort>
            {loading ? (
                <Loading></Loading>
            ) : userOrderList ? (
                userOrderList.map((el, id) => (
                    <div key={id} className="row">
                        <UserOrder orderItem={el}></UserOrder>
                    </div>
                ))
            ) : (
                <EmptyNotify message="Chưa có đơn hàng nào, ấn vào đây để mua hàng"></EmptyNotify>
            )}
        </div>
    );
}
