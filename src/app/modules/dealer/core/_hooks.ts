import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";

const useGetDealers = () => {
    return useQuery(["dealers"], api.getDealers);
};
const useGetProvinces = () => {
    return useQuery(["provinces"], api.getProvinces);
};

const useGetSurveryQuestion = () => {
    // return useMutation((formData: {fromDate: string, toDate: string, dealerId: number}) => {
    return useMutation((formData: {dealerId: number}) => {
        return api.getSurveryQuestion(formData)
    })
}

export { useGetDealers, useGetProvinces, useGetSurveryQuestion };
