import { dashboardHttp } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { ComplaintOrRequestSendData, ICarEvaluation, ISurvery, ITopx, ITopxFilter } from "./_models";

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
const getSurveryReport = async (formData: ISurvery) => {
    const { data } = await dashboardHttp.get(
        `CrmTBSReport/GetChanganSurveyDetailsDashboardRep?fromDate=${formData.fromDate}&toDate=${formData.toDate}&carGroupID=${formData.carGroupID}`
    );
    return data;
};

const getCarTypes = async() => {
    const {data} = await dashboardHttp.get('CrmTBSReport/GetCarTypes')
    return data
}

const getTopxReport = async (formData: ITopx) => {
    const filter = {
        fromDate: formData.fromDate,
        toDate:formData.toDate,
        top:formData.top
    }
    const { data } = await dashboardHttp.get(`${generateURLQueryParam('CrmTBSReport/GetTopXOnlyPartReport', filter)}`);

    // const { data } = await dashboardHttp.get(
    //     `CrmTBSReport/GetTopXOnlyPartReport?fromDate=${formData.fromDate}&toDate=${formData.toDate}&top=${formData.top}`
    // );
    return data;
};
const getTopxReportBaesdOfFilter = async (formData: ITopxFilter) => {
    const filter = {
        fromDate: formData.fromDate,
        toDate:formData.toDate,
        top:formData.top,
        carGroupID: formData.carGroupID,
        kilometrFrom: formData.kilometrFrom,
        kilometrTo: formData.kilometrTo,
    }
    const { data } = await dashboardHttp.get(`${generateURLQueryParam('CrmTBSReport/GetTopXPartReport', filter)}`);

    // const { data } = await dashboardHttp.get(
    //     `CrmTBSReport/GetTopXOnlyPartReport?fromDate=${formData.fromDate}&toDate=${formData.toDate}&top=${formData.top}&carGroupID=${formData.carGroupID}&kilometrFrom=${formData.kilometrFrom}&kilometrTo=${formData.kilometrTo}`
    // );
    return data;
};

export {
    getComplantOrRequestReport,
    getComplantOrRequestStatusReport,
    getComplantOrRequestByDealersReport,
    getCarElavuationReport,
    getQuestionForChangeSurvery,
    getSurveryReport,
    getCarTypes,
    getTopxReport,
    getTopxReportBaesdOfFilter
};
