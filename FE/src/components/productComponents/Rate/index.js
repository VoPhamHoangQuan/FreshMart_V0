import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./rateStyle.module.scss";
import EmptyNotify from "~/components/popupComponents/EmptyNotify";
import StarRate from "~/components/productComponents/StarRate";
import defaultUserImage from "~/vendor/image/default_user_image.png";
import {
    fetchCreateInitComment,
    fetchAddComment,
    fetchProductDetail,
} from "~/pages/user/ProductInfo/productInfoSlice";

function Rate({ data }) {
    const dispatch = useDispatch();
    const { productDetail, message } = useSelector(
        (state) => state.productInfo
    );
    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    const [commentsValid, setCommentsValid] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [rate, setRate] = useState("");
    const [infoValid, setInfoValid] = useState(false);
    const [alreadyComment, setAlreadyComment] = useState(false);
    const [notPaid, setNotPaid] = useState(false);
    const [refesh, setRefesh] = useState(false);

    async function handleSubmitComment(e) {
        e.preventDefault();
        if (!data.commentsId) {
            await dispatch(fetchCreateInitComment({ productId: data._id }));
            await dispatch(fetchProductDetail(data._id));
            setRefesh(true);
        } else {
            await dispatch(
                fetchAddComment({
                    token: userInfo.token,
                    productId: data._id,
                    message: userMessage,
                    rate,
                })
            );
            await dispatch(fetchProductDetail(data._id));
            setRefesh(true);
        }
    }

    useEffect(() => {
        productDetail.commentsId && productDetail.commentsId.comments.length > 0
            ? setCommentsValid(true)
            : setCommentsValid(false);
    }, [productDetail, message]);

    useEffect(() => {
        message === "already comment"
            ? setAlreadyComment(true)
            : message === "notPaid"
            ? setNotPaid(true)
            : setAlreadyComment(false) && setNotPaid(false);
        console.log(message);
    }, [message]);

    useEffect(() => {
        userMessage !== "" && rate !== ""
            ? setInfoValid(true)
            : setInfoValid(false);
    }, [userMessage, rate]);

    return (
        <div className={clsx("row", style.rate_container, "mt-1")}>
            <div className={style.rate_title}>
                <span>Đánh giá sản phẩm</span>
            </div>
            <>
                {userInfo ? (
                    <div className={style.rate_form}>
                        {!alreadyComment && !notPaid ? (
                            <form id="commentForm">
                                <label htmlFor="name">Danh xưng</label>
                                <span className={style.name_container}>
                                    {userInfo.name}
                                </span>

                                <label htmlFor="comment">Nhận xét</label>
                                <textarea
                                    rows={6}
                                    form="commentForm"
                                    name="commentInput"
                                    value={userMessage}
                                    onChange={(e) =>
                                        setUserMessage(e.target.value)
                                    }
                                    placeholder="Viết nhận xét tại đây"
                                ></textarea>
                                <div className={style.rateControl_container}>
                                    <div className={style.rate_score}>
                                        <label>Đánh giá</label>
                                        <select
                                            onChange={(e) =>
                                                setRate(e.target.value)
                                            }
                                        >
                                            <option value="1">1.Tệ</option>
                                            <option value="2">
                                                2.Tạm được{" "}
                                            </option>
                                            <option value="3">
                                                3.Khá tốt{" "}
                                            </option>
                                            <option value="4">4.Tốt </option>
                                            <option value="5">
                                                5.Tuyệt vời{" "}
                                            </option>
                                        </select>
                                    </div>
                                    <div className={style.rate_submitBtn}>
                                        <button
                                            type="submit"
                                            className={clsx(
                                                "primary_btn_style_1",
                                                {
                                                    ["primary_btn_style_1__inActive"]:
                                                        !infoValid,
                                                }
                                            )}
                                            disabled={!infoValid}
                                            onClick={(e) =>
                                                handleSubmitComment(e)
                                            }
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : notPaid === true ? (
                            <span className={style.alreadyComment_message}>
                                Quý khách hãy mua hàng để có thể đánh giá và
                                đánh giá chính xác hơn nha.
                            </span>
                        ) : (
                            <span className={style.alreadyComment_message}>
                                Quý khách đã đánh giá sản phẩm này rồi.
                            </span>
                        )}
                    </div>
                ) : (
                    <span className={style.alreadyComment_message}>
                        Quý khách hãy đăng nhập và mua hàng để đánh giá nha.
                    </span>
                )}
                <div className={style.rate_guestComment_container}>
                    {commentsValid === true ? (
                        productDetail.commentsId.comments.map((el, key) => (
                            <div key={key} className={style.rate_guestComment}>
                                <div className={style.guestComment_title}>
                                    {el.userId.image ? (
                                        <div className={style.image_container}>
                                            <img
                                                src={el.userId.image}
                                                alt="user"
                                            ></img>
                                        </div>
                                    ) : (
                                        <div className={style.image_container}>
                                            <img
                                                src={defaultUserImage}
                                                alt="user"
                                            ></img>
                                        </div>
                                    )}
                                    <span>{`${
                                        el.userId.gender === "male"
                                            ? "Anh"
                                            : "Chị"
                                    } ${el.userId.name}`}</span>
                                </div>
                                <StarRate rate={el.rate}></StarRate>
                                <div className={style.guestComment_content}>
                                    <span>{el.message}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyNotify message="Chưa có comment nào"></EmptyNotify>
                    )}
                </div>
            </>
        </div>
    );
}

export default Rate;
