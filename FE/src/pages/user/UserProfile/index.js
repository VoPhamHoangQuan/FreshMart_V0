import React, { useEffect, useState } from "react";
import style from "./userProfileStyle.module.scss";
import { storage } from "~/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import defaultUserImage from "~/vendor/image/default_user_image.png";
import { reverseFormatPhoneNumber } from "~/vendor/js";
import { fetchUpdateUser } from "~/pages/user/UserProfile/userProfileSlice";
import Loading from "~/components/Loading";
import BreadCrumb from "~/components/BreadCrumb";

export default function UserProfile() {
    const disptch = useDispatch();
    const { loading, message, error } = useSelector(
        (state) => state.UserProfile
    );
    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    const [gender, setGender] = useState(`${userInfo.gender}`);
    const [imageObject, setImageObject] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [userName, setUserName] = useState(userInfo.name);

    function handleGenderChange(e) {
        setGender(e.target.value);
    }
    function handleChooseImage(e) {
        setImageObject(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    }
    function handleImageUpload(e) {
        if (imageFile === null) {
            return;
        }
        const imageName = v4();
        const imageRef = ref(storage, `userImages/${imageName}`);
        uploadBytes(imageRef, imageFile).then(() => {
            getDownloadURL(imageRef).then((url) => {
                alert("upload image success");
                setImageUrl(url);
            });
        });
    }

    function handleSubmit() {
        disptch(
            fetchUpdateUser({
                token: userInfo.token,
                name: userName,
                gender,
                imageUrl,
                phone: userInfo.phone,
                isAdmin: userInfo.isAdmin,
                isDelete: userInfo.isDelete,
            })
        );
    }

    useEffect(() => {
        setImageObject(userInfo.image);
    }, []);

    return (
        <div className="col_lg_8_10">
            <div className="row">
                <BreadCrumb
                    directionMap={[
                        {
                            pageName: "Hồ sơ cá nhân",
                            currentPage: true,
                        },
                    ]}
                />
            </div>
            <div className="row mt-1">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div className={style.container}>
                        <div className={style.heading_container}>
                            <span>Hồ sơ của tôi</span>
                        </div>
                        <div className={style.body_container}>
                            <div className={style.info_container}>
                                <div className={style.detailInput_container}>
                                    <span>Tên</span>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                    ></input>
                                </div>
                                <div className={style.detailInput_container}>
                                    <span>Số điện thoại</span>
                                    <span className={style.phone}>
                                        {reverseFormatPhoneNumber(
                                            userInfo.phone
                                        )}
                                    </span>
                                </div>
                                <div className={style.detailRadio_container}>
                                    <span>Giới tính</span>
                                    <div className={style.genderInput}>
                                        <div className={style.gender}>
                                            <input
                                                id="male"
                                                name="gender"
                                                type="radio"
                                                value="male"
                                                checked={
                                                    gender === "male"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    handleGenderChange(e)
                                                }
                                            ></input>
                                            <label htmlFor="male">Nam</label>
                                        </div>
                                        <div className={style.gender}>
                                            <input
                                                id="female"
                                                name="gender"
                                                type="radio"
                                                value="female"
                                                checked={
                                                    gender === "female"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    handleGenderChange(e)
                                                }
                                            ></input>
                                            <label htmlFor="female">Nữ</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.Btn_container}>
                                    <div className={style.confirmBtn_container}>
                                        <button
                                            className={clsx(
                                                "primary_btn_style_1",
                                                {
                                                    ["primary_btn_style_1__inActive"]:
                                                        userName === "",
                                                }
                                            )}
                                            onClick={handleSubmit}
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={style.image_container}>
                                <img
                                    src={
                                        !imageFile
                                            ? defaultUserImage
                                            : imageObject
                                    }
                                    alt="user"
                                ></img>
                                <div className={style.uploadImage_container}>
                                    <input
                                        type="file"
                                        placeholder="Chọn ảnh"
                                        onChange={(e) => handleChooseImage(e)}
                                    ></input>
                                    <div className={style.uploadBtn_container}>
                                        <div className={style.uploadBtn}>
                                            <button
                                                className="primary_btn_style_1"
                                                onClick={(e) =>
                                                    handleImageUpload(e)
                                                }
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
