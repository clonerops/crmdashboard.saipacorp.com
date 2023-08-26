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

const getSurveryQuestion = async (formData: {dealerId: number}) => {
    const { data } = await dashboardHttp.get(`/DealersSurveyReport/GetSurveyResultByQuestionType?provinceId=0&dealerId=${formData.dealerId}`);
    return data;
}

export {
    getDealers,
    getProvinces,
    getSurveryQuestion
}; 
