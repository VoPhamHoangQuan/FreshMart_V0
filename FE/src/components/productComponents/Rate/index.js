import style from "./rateStyle.module.scss";
import clsx from "clsx";

function Rate() {
    return (
        <div className={clsx("row", style.rate_container, "mt-1")}>
            <div className={style.rate_title}>
                <span>Đánh giá sản phẩm</span>
            </div>
            <div className={style.rate_form}>
                <form id="commentForm">
                    <label htmlFor="name">Họ và tên</label>
                    <input
                        type="text"
                        id="name"
                        name="nameInput"
                        placeholder="Điền họ tên tại đây"
                    />

                    <label htmlFor="comment">Nhận xét</label>
                    <textarea
                        rows={6}
                        form="commentForm"
                        name="commentInput"
                        placeholder="Viết nhận xét tại đây"
                    ></textarea>
                    <div className={style.rateControl_container}>
                        <div className={style.rate_score}>
                            <label>Đánh giá</label>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                        <div className={style.rate_submitBtn}>
                            <input
                                type="submit"
                                value="Xác nhận"
                                className="primary_btn_style_1"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className={style.rate_guestComment_container}>
                {/* loop data here */}
                <div className={style.rate_guestComment}>
                    <div className={style.guestComment_title}>
                        <span>Thái Thị Thảo</span>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                    </div>
                    <div className={style.guestComment_content}>
                        <span>
                            san pham rat phu hop voi may giat, thom, sach quan
                            ao, minh rat hai long, lan sau se mau hang tiep o
                            BACH HOA XANH
                        </span>
                    </div>
                </div>

                <div className={style.rate_guestComment}>
                    <div className={style.guestComment_title}>
                        <span>Thái Thị Thảo</span>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                    </div>
                    <div className={style.guestComment_content}>
                        <span>
                            san pham rat phu hop voi may giat, thom, sach quan
                            ao, minh rat hai long, lan sau se mau hang tiep o
                            BACH HOA XANH
                        </span>
                    </div>
                </div>
                {/*end loop data here */}
            </div>
        </div>
    );
}

export default Rate;
