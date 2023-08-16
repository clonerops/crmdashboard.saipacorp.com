import { dashboardHttp } from "../../../../_cloner/helpers/axiosConfig";
import { ComplaintOrRequestSendData } from "./_models";

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

export {
    getComplantOrRequestReport,
    getComplantOrRequestStatusReport,
    getComplantOrRequestByDealersReport,
};
