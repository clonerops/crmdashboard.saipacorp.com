import { dashboardHttp } from "../../../../_cloner/helpers/axiosConfig";

// Tables Details
const getDealers = async () => {
    const { data } = await dashboardHttp.get(`/DealersSurveyReport/GetDealers`);
    return data;
};
const getProvinces = async () => {
    const { data } = await dashboardHttp.get(`/SaleSystem/GetAllProvinces`);
    return data;
};

const getSurveryQuestion = async (formData: {fromDate: string, toDate: string, dealerId: number}) => {
    const { data } = await dashboardHttp.get(`/DealersSurveyReport/GetSurveyResultByQuestionType?fromDate=${formData.fromDate}&toDate=${formData.toDate}&provinceId=0&dealerId=${formData.dealerId}`);
    return data;
}

const getRatingByProvince = async (formData: {fromDate: string, toDate: string, provinceId: string}) => {
    const { data } = await dashboardHttp.get(`/DealersSurveyReport/GetSurveyResultByDealer?fromDate=${formData.fromDate}&toDate=${formData.toDate}&provinceId=${formData.provinceId}&dealerId=0`);
    return data;
}
// const getSurveryQuestion = async (formData: { dealerId: number}) => {
//     const { data } = await dashboardHttp.get(`/DealersSurveyReport/GetSurveyResultByQuestionType?&provinceId=0&dealerId=${formData.dealerId}`);
//     return data;
// }

export {
    getDealers,
    getProvinces,
    getSurveryQuestion,
    getRatingByProvince
}; 
