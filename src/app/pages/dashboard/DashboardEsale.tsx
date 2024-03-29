/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { PageTitle } from "../../../_cloner/layout/core";
import SaleTotalTypeReport from "../../modules/esale/components/SaleTotalTypeReport";
import SaleByProductReport from "../../modules/esale/components/SaleByProductReport";
import SaleByProductPriorityReport from "../../modules/esale/components/SaleByProductPriorityReport";
import SaleTotalProductAndDateReport from "../../modules/esale/components/SaleTotalProductAndDateReport";
import {
    checkUserRole,
    getUserRoles,
} from "../../../_cloner/helpers/reusableFunction";
import AccessDenied from "../../../_cloner/helpers/components/AccessDenied";
import SaleByProductDepositorsReport from "../../modules/esale/components/SaleByProductDepositorsReport";
import SaleByProductInvoicedReport from "../../modules/esale/components/SaleByProductInvoicedReport";

const DashboardEsale: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>
                {"داشبورد مدیریتی فروش اینترنتی"}
            </PageTitle>
            {checkUserRole(
                getUserRoles(),
                "TransLotteryWinnerDashboard"
            ) ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <SaleTotalTypeReport />
                        </div>
                        <div className="mt-2 mb-2 shadow-lg lg:col-span-2">
                            <SaleTotalProductAndDateReport />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <SaleByProductReport />
                        </div>
                        <div className="mt-2 mb-2 shadow-lg">
                            <SaleByProductPriorityReport />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <SaleByProductDepositorsReport />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <SaleByProductInvoicedReport />
                        </div>
                    </div>
                </>
            ) : (
                <AccessDenied />
            )}
        </>
    );
};
export { DashboardEsale };
