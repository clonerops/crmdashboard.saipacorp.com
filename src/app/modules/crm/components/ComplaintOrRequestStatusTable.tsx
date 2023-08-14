/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

type Props = {
    className: string;
    data?: any;
    isLoading?: boolean;
    isError?: boolean;
};

const ComplaintOrRequestStatusTable: React.FC<Props> = ({
    className,
    data,
    isLoading,
    isError,
}) => {
    if (isLoading) {
        return <div>درحال بارگزاری...</div>;
    }

    if (isError) {
        return <div>Error fetching chart data</div>;
    }

    return (
        <div className={`card ${className}`}>
            {/* begin::Body */}
            <div className="card-body py-3">
                {/* begin::Table container */}
                <div className="table-responsive">
                    {/* begin::Table */}
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        {/* begin::Table head */}
                        <thead>
                            <tr className="fw-bold text-muted">
                                <th className="text-start">قرارداد درخواست</th>
                                <th className="text-start">نوع درخواست</th>
                                <th className="text-start">وضعیت</th>
                                <th className="text-start">تعداد</th>
                            </tr>
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                            {data?.map((item: any) => {
                                return (
                                    <>
                                        <tr>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.contract}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.type}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.status}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.countAll}
                                                </a>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                        {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div>
            {/* begin::Body */}
        </div>
    );
};

export { ComplaintOrRequestStatusTable };
