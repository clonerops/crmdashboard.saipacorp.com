export interface SaleReportRequest {
    saletypeId: number;
    saleTotalTypeDetailId: number;
    isJavani: number;
}
export interface SaleByProductReportRequest extends SaleReportRequest {
    winnerType: number;
}
export interface SaleByProductPriorityReportRequest
    extends SaleByProductReportRequest {
    priority: number;
}
export interface SaleByProductDepositorsReportRequest
    extends SaleReportRequest {
    fromDate: string;
    toDate: string;
    priority: number;
}
export interface SaleByProductInvoicedReportRequest extends SaleReportRequest {
    priority: number;
}
export interface SaleByProductInvoicedReportDetailRequest
    extends SaleByProductInvoicedReportRequest {}

