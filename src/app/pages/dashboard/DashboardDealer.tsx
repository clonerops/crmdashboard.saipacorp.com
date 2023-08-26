/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { PageTitle } from "../../../_cloner/layout/core";
import {
    checkUserRole,
    getUserRoles,
} from "../../../_cloner/helpers/reusableFunction";
import AccessDenied from "../../../_cloner/helpers/components/AccessDenied";
import DealersQuestionReport from "../../modules/dealer/components/DealersQuestionReport";

const DashboardDealer: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{"داشبورد نمایندگی ها"}</PageTitle>
            {checkUserRole(getUserRoles(), "TransCrmDashboard") ? (
                <>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <DealersQuestionReport />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4"></div>
                </>
            ) : (
                <AccessDenied />
            )}
        </>
    );
};
export { DashboardDealer };
