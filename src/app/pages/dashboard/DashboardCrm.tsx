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

const DashboardCrm: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>
                {"داشبورد مدیریتی امور مشتریان"}
            </PageTitle>
            {checkUserRole(
                getUserRoles(),
                "TransLotteryWinnerDashboardStatisticCRM"
            ) ? (
                <>
                    <div className="md:grid md:grid-cols-3 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <SaleTotalTypeReport />
                        </div>
                        <div className="mt-2 mb-2 shadow-lg md:col-span-2">
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
                </>
            ) : (
                <AccessDenied />
            )}
        </>
    );
};
export { DashboardCrm };
