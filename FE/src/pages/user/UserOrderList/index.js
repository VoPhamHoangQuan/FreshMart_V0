import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrderList } from "./userOrderListSlice";
import { useNavigate } from "react-router-dom";
import UserOrder from "~/components/orderComponents/UserOrder";
import BreadCrumb from "~/components/BreadCrumb";
import EmptyNotify from "~/components/popupComponents/EmptyNotify";

export default function UserOrderList() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { userOrderList } = useSelector((state) => state.userOrderInfo);
    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

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
            {userOrderList ? (
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
