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
                <span>????nh gi?? s???n ph???m</span>
            </div>
            <>
                {userInfo ? (
                    <div className={style.rate_form}>
                        {!alreadyComment && !notPaid ? (
                            <form id="commentForm">
                                <label htmlFor="name">Danh x??ng</label>
                                <span className={style.name_container}>
                                    {userInfo.name}
                                </span>

                                <label htmlFor="comment">Nh???n x??t</label>
                                <textarea
                                    rows={6}
                                    form="commentForm"
                                    name="commentInput"
                                    value={userMessage}
                                    onChange={(e) =>
                                        setUserMessage(e.target.value)
                                    }
                                    placeholder="Vi???t nh???n x??t t???i ????y"
                                ></textarea>
                                <div className={style.rateControl_container}>
                                    <div className={style.rate_score}>
                                        <label>????nh gi??</label>
                                        <select
                                            onChange={(e) =>
                                                setRate(e.target.value)
                                            }
                                        >
                                            <option value="1">1.T???</option>
                                            <option value="2">
                                                2.T???m ???????c{" "}
                                            </option>
                                            <option value="3">
                                                3.Kh?? t???t{" "}
                                            </option>
                                            <option value="4">4.T???t </option>
                                            <option value="5">
                                                5.Tuy???t v???i{" "}
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
                                            X??c nh???n
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : notPaid === true ? (
                            <span className={style.alreadyComment_message}>
                                Qu?? kh??ch h??y mua h??ng ????? c?? th??? ????nh gi?? v??
                                ????nh gi?? ch??nh x??c h??n nha.
                            </span>
                        ) : (
                            <span className={style.alreadyComment_message}>
                                Qu?? kh??ch ???? ????nh gi?? s???n ph???m n??y r???i.
                            </span>
                        )}
                    </div>
                ) : (
                    <span className={style.alreadyComment_message}>
                        Qu?? kh??ch h??y ????ng nh???p v?? mua h??ng ????? ????nh gi?? nha.
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
                                            : "Ch???"
                                    } ${el.userId.name}`}</span>
                                </div>
                                <StarRate rate={el.rate}></StarRate>
                                <div className={style.guestComment_content}>
                                    <span>{el.message}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyNotify message="Ch??a c?? comment n??o"></EmptyNotify>
                    )}
                </div>
            </>
        </div>
    );
}

export default Rate;
