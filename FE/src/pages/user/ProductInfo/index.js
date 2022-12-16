import clsx from "clsx";
import style from "./productDetail.module.scss";
import ProductDetail from "~/components/productComponents/ProductDetail";
import Rate from "~/components/productComponents/Rate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productDetailSlice, { fetchProductDetail } from "./productInfoSlice";
import Loading from "~/components/Loading";
import Error from "~/components/popupComponents/Error";
import BreadCrumb from "~/components/BreadCrumb";

function ProductInfo() {
    const params = useParams();
    const dispatch = useDispatch();
    const { productDetail, loading, error } = useSelector(
        (state) => state.productInfo
    );
    useEffect(() => {
        dispatch(productDetailSlice.actions.clearMessage());
    }, []);

    useEffect(() => {
        const fetchProductDetailData = async () => {
            await dispatch(fetchProductDetail(params.id));
        };
        fetchProductDetailData();
    }, [dispatch, params.id]);
    return (
        <div className="row mb-1">
            <div className="col_lg_8_12">
                {loading ? (
                    <Loading></Loading>
                ) : error !== "" ? (
                    <Error type="danger" message={error}></Error>
                ) : (
                    <>
                        <BreadCrumb
                            directionMap={[
                                {
                                    pageName: "Chi tiết sản phẩm",
                                    currentPage: true,
                                },
                            ]}
                        />

                        <ProductDetail data={productDetail}></ProductDetail>
                        <Rate data={productDetail}></Rate>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductInfo;
