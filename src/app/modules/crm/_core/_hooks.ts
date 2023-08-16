import { useMutation } from "@tanstack/react-query";
import * as api from "./_requests";
import { ComplaintOrRequestSendData } from "./_models";


const useGetComplaintOrRequestReport = () => {
    return useMutation((formData: ComplaintOrRequestSendData) => {
        return api.getComplantOrRequestReport(formData);
    });
};

const useGetComplaintOrRequestStatusReport = () => {
    return useMutation((formData: ComplaintOrRequestSendData) => {
        return api.getComplantOrRequestStatusReport(formData);
    });
};
const useGetComplaintOrRequestByDealersReport = () => {
    return useMutation((formData: ComplaintOrRequestSendData) => {
        return api.getComplantOrRequestByDealersReport(formData);
    });
};


export {
    useGetComplaintOrRequestReport,
    useGetComplaintOrRequestStatusReport,
    useGetComplaintOrRequestByDealersReport
};
