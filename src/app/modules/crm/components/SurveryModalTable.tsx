/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

type Props = {
    className: string;
    data?: any;
    isLoading?: boolean;
    isError?: boolean;
};

const SuerveryModalTable: React.FC<Props> = ({
    className,
    data,
    isLoading,
    isError,
}) => {
    //   const [dataset, setDataset] = useState([])
    //   useEffect(() => {
    //         const newObject = {
    //       caR_TYPE_DESC: 'جمع کل',
    //       calltopaY_CNT: data?.reduce((accumulator: any, currentValue: any) => {
    //         return accumulator + currentValue.calltopaY_CNT
    //       }, 0),
    //     //   paymentwaitinG_CNT: data?.reduce((accumulator: any, currentValue: any) => {
    //     //     return accumulator + currentValue.paymentwaitinG_CNT
    //     //   }, 0),
    //     //   unverifiedapplicanT_CNT: data.reduce((accumulator: any, currentValue: any) => {
    //     //     return accumulator + currentValue.unverifiedapplicanT_CNT
    //     //   }, 0),
    //     //   payedcount: data.reduce((accumulator: any, currentValue: any) => {
    //     //     return accumulator + currentValue.payedcount
    //     //   }, 0),
    //     //   counT_ALL: data.reduce((accumulator: any, currentValue: any) => {
    //     //     return accumulator + currentValue.counT_ALL
    //     //   }, 0),
    //     }
    //     // const dataObject: any = [...data]
    //     // data.unshift(newObject)
    //     // setDataset(dataObject)

    //   }, [data])

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
                                <th className="text-start">قطعه</th>
                                <th className="text-start">شماره سریال</th>
                                <th className="text-start">کدقطعه</th>
                                <th className="text-start">فروردین</th>
                                <th className="text-start">اردیبهشت</th>
                                <th className="text-start">خرداد</th>
                                <th className="text-start">تیر</th>
                                <th className="text-start">مرداد</th>
                                <th className="text-start">شهریور</th>
                                <th className="text-start">مهر</th>
                                <th className="text-start">آبان</th>
                                <th className="text-start">آذر</th>
                                <th className="text-start">دی</th>
                                <th className="text-start">بهمن</th>
                                <th className="text-start">اسفند</th>
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
                                                    {item.part_desc}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.part_serial}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.fanniCode}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.فروردين}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.ارديبهشت}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.خرداد}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.تیر}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.مرداد}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.شهريور}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.مهر}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.آبان}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.آذر}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.دی}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.بهمن}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-start text-dark fw-bold text-hover-primary d-block fs-6"
                                                >
                                                    {item.اسفند}
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

export { SuerveryModalTable };
