/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { PageTitle } from "../../../_cloner/layout/core";
import {
    checkUserRole,
    getUserRoles,
} from "../../../_cloner/helpers/reusableFunction";
import AccessDenied from "../../../_cloner/helpers/components/AccessDenied";
import ComplaintOrRequest from "../../modules/crm/components/ComplaintOrRequest";
import ComplaintOrRequestStatus from "../../modules/crm/components/ComplaintOrRequestStatus";
import ComplaintOrRequestByDealers from "../../modules/crm/components/ComplaintOrRequestByDealers";
import CarEvaluationReport from "../../modules/crm/components/CarEvaluationReport";
import SurveryReport from "../../modules/crm/components/SurveryReport";
import TopxReport from "../../modules/crm/components/TopxReport";
import TopxReportBasedOfFilter from "../../modules/crm/components/TopxReportBasedOfFilter";
import CarEvaluationReportBasedOfProvince from "../../modules/crm/components/CarEvaluationReportBasedOfProvince";
import SurveryBasedOfProvinceReport from "../../modules/crm/components/SurveryBasedOfProvinceReport";

const DashboardCrm: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>
                {"داشبورد مدیریتی امور مشتریان"}
            </PageTitle>
            {checkUserRole(getUserRoles(), "TransCrmDashboard") ? (
                <>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg">
                            <ComplaintOrRequest />
                        </div>
                        <div className="">
                            <ComplaintOrRequestByDealers />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg ">
                            <ComplaintOrRequestStatus />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg ">
                            <CarEvaluationReport />
                        </div>
                        <div className="mt-2 mb-2 shadow-lg ">
                            <CarEvaluationReportBasedOfProvince />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg ">
                            <SurveryReport />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg ">
                            <SurveryBasedOfProvinceReport />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg ">
                            <TopxReport />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-1 md:gap-4">
                        <div className="mt-2 mb-2 shadow-lg ">
                            <TopxReportBasedOfFilter />
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
