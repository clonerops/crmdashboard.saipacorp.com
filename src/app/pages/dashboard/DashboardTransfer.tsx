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
import BilllandingByStatus from "../../modules/transfer/components/BilllandingByStatus";
import BilllandingCarsByStatus from "../../modules/transfer/components/BilllandingCarsByStatus";

const DashboardTransfer: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>
                {"داشبورد مدیریتی حمل محصول"}
            </PageTitle>
            {checkUserRole(
                getUserRoles(),
                "TransLotteryWinnerDashboardStatistic"
            ) ? (
                <>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <BilllandingCarsByStatus />
                        </div>
                        {/* <div className="mt-2 mb-2 shadow-lg">
                            <BilllandingByStatus />
                        </div> */}
                    </div>
                </>
            ) : (
                <AccessDenied />
            )}
        </>
    );
};
export { DashboardTransfer };
