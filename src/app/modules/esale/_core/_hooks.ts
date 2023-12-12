import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import {
    SaleByProductDepositorsReportRequest,
    SaleByProductInvoicedReportDetailRequest,
    SaleByProductInvoicedReportRequest,
    SaleByProductPriorityReportRequest,
    SaleByProductReportRequest,
    SaleReportRequest,
} from "./_models";

const useGetSaleTotalTypes = () => {
    return useQuery(["saleTotalTypes"], api.getSaleTotalTypes);
};

const useGetSaleTotalTypeDetails = () => {
    return useMutation((id: number) => {
        return api.getSaleTotalTypeDetails(id);
    });
};

const useGetDeliverDates = () => {
    return useQuery(["deliverDates"], api.getDeliverDates);
};

const useGetWinnerTypes = () => {
    return useQuery(["winnerTypes"], api.getWinnerTypes);
};
const useGetSaleMountReport = () => {
    return useQuery(["saleReport"], api.getSaleMountReport);
};

const useGetSaleReport = () => {
    return useMutation((formData: SaleReportRequest) => {
        return api.getSaleReport(formData);
    });
};

const useGetSaleByProductReport = () => {
    return useMutation((formData: SaleByProductReportRequest) => {
        return api.getSaleByProductReport(formData);
    });
};
const useGetSaleByProductPriorityReport = () => {
    return useMutation((formData: SaleByProductPriorityReportRequest) => {
        return api.getSaleByProductPriorityReport(formData);
    });
};
const useGetSaleByProductDepositorsReport = () => {
    return useMutation((formData: SaleByProductDepositorsReportRequest) => {
        return api.getSaleByProductDepositorsReport(formData);
    });
};
const useGetSaleByProductInvoicedReport = () => {
    return useMutation((formData: SaleByProductInvoicedReportRequest) => {
        return api.getSaleByProductInvoicedReport(formData);
    });
};
const useGetSaleByProductInvoicedReportDetail = () => {
    return useMutation((formData: SaleByProductInvoicedReportDetailRequest) => {
        return api.getSaleByProductInvoicedReportDetail(formData);
    });
};
const useGetSaleByProductPriorityAndSaleDetailReport = () => {
    return useMutation((formData: SaleReportRequest) => {
        return api.getSaleByProductPriorityAndSaleDetailReport(formData);
    });
};

// Tables
const useGetSaleDetailsReport = () => {
    return useMutation((formData: SaleReportRequest) => {
        return api.getSaleDetailsReport(formData);
    });
};

const useGetSaleTotalDetailsReport = () => {
    return useMutation((isJavani: number) => {
        return api.getSaleTotalDetailReport(isJavani);
    });
};

// Excel
const useGetSaleTotalExcel = () => {
    return useMutation((formData: SaleReportRequest) => {
        return api.downloadTotalTypeExcel(formData);
    });
};

const useGetSaleTotalDetailsExcel = () => {
    return useMutation((isJavani: number) => {
        return api.downloadTotalTypeDetailExcel(isJavani);
    });
};

const useGetSamtDepartmentExcel = () => {
    return useMutation((formData: SaleByProductInvoicedReportDetailRequest) => {
        return api.downloadSamtDepartemantReportExcel(formData);
    });
};

export {
    useGetSaleTotalTypes,
    useGetSaleTotalTypeDetails,
    useGetDeliverDates,
    useGetWinnerTypes,
    useGetSaleReport,
    useGetSaleMountReport,
    useGetSaleByProductReport,
    useGetSaleByProductPriorityReport,
    useGetSaleByProductPriorityAndSaleDetailReport,
    useGetSaleByProductDepositorsReport,
    useGetSaleByProductInvoicedReport,
    useGetSaleByProductInvoicedReportDetail,
    useGetSaleDetailsReport,
    useGetSaleTotalDetailsReport,
    useGetSaleTotalExcel,
    useGetSaleTotalDetailsExcel,
    useGetSamtDepartmentExcel
};
