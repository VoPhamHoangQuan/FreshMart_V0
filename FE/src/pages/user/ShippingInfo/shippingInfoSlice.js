import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: "",
    error: "",
    VNProvince: [],
    VNDistrict: [],
    VNWard: [],
    serviceType: [],
    shippingFee: {},
    shippingInfomation: {},
};

const fetchVNProvince = createAsyncThunk(
    "shippingInfo/getVNProvince",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
                {
                    headers: {
                        token: "c98c984f-6ca2-11ed-b09a-9a2a48e971b0",
                    },
                }
            );
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchVNDistrict = createAsyncThunk(
    "shippingInfo/getVNDistrict",
    async (payload, { rejectWithValue }) => {
        try {
            const body = {
                province_id: payload,
            };
            const header = {
                token: "c98c984f-6ca2-11ed-b09a-9a2a48e971b0",
            };
            const { data } = await axios.post(
                "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
                body,
                {
                    headers: header,
                }
            );
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchVNWard = createAsyncThunk(
    "shippingInfo/getVNWard",
    async (payload, { rejectWithValue }) => {
        try {
            const body = {
                district_id: payload,
            };
            const header = {
                token: "c98c984f-6ca2-11ed-b09a-9a2a48e971b0",
            };
            const { data } = await axios.post(
                "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                body,
                {
                    headers: header,
                }
            );
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchShippingService = createAsyncThunk(
    "shippingInfo/getServiceType",
    async (payload, { rejectWithValue }) => {
        try {
            const body = {
                shop_id: 3487931,
                from_district: 1456, //Tan Phu district
                to_district: payload,
            };
            const header = {
                token: "c98c984f-6ca2-11ed-b09a-9a2a48e971b0",
            };
            const { data } = await axios.post(
                "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
                body,
                {
                    headers: header,
                }
            );
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const fetchShippingFee = createAsyncThunk(
    "shippingInfo/getShippingFee",
    async (payload, { rejectWithValue }) => {
        try {
            const body = {
                service_id: payload.serviceId,
                insurance_value: payload.totalPrice,
                coupon: null,
                from_district_id: 1456,
                to_district_id: payload.districtId,
                to_ward_code: payload.wardCode,
                height: 15,
                length: 15,
                weight: 1000,
                width: 15,
            };
            const header = {
                token: "c98c984f-6ca2-11ed-b09a-9a2a48e971b0",
                shop_id: 3487931,
            };
            const { data } = await axios.post(
                "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                body,
                {
                    headers: header,
                }
            );
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const shippingInfoSlice = createSlice({
    name: "shippingInfo",
    initialState,
    reducers: {
        setShippingInfomation: (state, action) => {
            state.shippingInfomation = action.payload;
            localStorage.setItem(
                "shippingInfo",
                JSON.stringify(action.payload)
            );
        },
    },
    extraReducers: {
        [fetchVNProvince.fulfilled]: (state, action) => {
            state.VNProvince = action.payload;
        },
        [fetchVNDistrict.fulfilled]: (state, action) => {
            state.VNDistrict = action.payload;
        },
        [fetchVNWard.fulfilled]: (state, action) => {
            state.VNWard = action.payload;
        },
        [fetchShippingService.fulfilled]: (state, action) => {
            state.serviceType = action.payload;
        },
        [fetchShippingFee.fulfilled]: (state, action) => {
            state.shippingFee = action.payload;
        },
    },
});

export default shippingInfoSlice;
export {
    fetchVNProvince,
    fetchVNDistrict,
    fetchVNWard,
    fetchShippingService,
    fetchShippingFee,
};
