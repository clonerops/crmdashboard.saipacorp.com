import { dashboardHttp } from "../../../../_cloner/helpers/axiosConfig";
import { ComplaintOrRequestSendData, ICarEvaluation } from "./_models";

// Tables Details
const getComplantOrRequestReport = async (
    formData: ComplaintOrRequestSendData
) => {
    const { data } = await dashboardHttp.get(
        `CrmTBSReport/GetComplaintStatisticDashboardRep?fromDate=${formData.fromDate}&toDate=${formData.toDate}`
    );
    return data;
};
const getComplantOrRequestStatusReport = async (
    formData: ComplaintOrRequestSendData
) => {
    const { data } = await dashboardHttp.get(
        `CrmTBSReport/GetComplaintStatusDashboardRep?fromDate=${formData.fromDate}&toDate=${formData.toDate}`
    );
    return data;
};
const getComplantOrRequestByDealersReport = async (
    formData: ComplaintOrRequestSendData
) => {
    const { data } = await dashboardHttp.get(
        `CrmTBSReport/GetComplaintStatisticByDealers?fromDate=${formData.fromDate}&toDate=${formData.toDate}`
    );
    return data;
};
const getCarElavuationReport = async (formData: ICarEvaluation) => {
    const { data } = await dashboardHttp.get(
        `CrmTBSReport/GetChanganSurveyQuestionsRep?qustionNo=${formData.qustionNo}&carGroupID=${formData.carGroupID}`
    );
    return data;
};
const getQuestionForChangeSurvery = async () => {
    const { data } = await dashboardHttp.get(
        `CrmTBSReport/GetQuestionForChanganSurvey`
    );
    return data;
};

export {
    getComplantOrRequestReport,
    getComplantOrRequestStatusReport,
    getComplantOrRequestByDealersReport,
    getCarElavuationReport,
    getQuestionForChangeSurvery
};
