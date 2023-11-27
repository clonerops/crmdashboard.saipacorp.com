import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { ComplaintOrRequestSendData, ICarEvaluation, ISurvery } from "./_models";


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
const useGetCarEvulationReport = () => {
    return useMutation((formData: ICarEvaluation) => {
        return api.getCarElavuationReport(formData);
    });
};

const useGetQuestionChangeSurvery = () => {
    return useQuery(['surveryQuestion'], () => api.getQuestionForChangeSurvery())
};

const useGetSurveryReport = () => {
    return useMutation((formData: ISurvery) => {
        return api.getSurveryReport(formData);
    });
};


export {
    useGetComplaintOrRequestReport,
    useGetComplaintOrRequestStatusReport,
    useGetComplaintOrRequestByDealersReport,
    useGetCarEvulationReport,
    useGetQuestionChangeSurvery,
    useGetSurveryReport
};
