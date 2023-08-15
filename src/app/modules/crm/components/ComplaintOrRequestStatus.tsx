import moment from "moment-jalaali";
import { useEffect, useState } from "react";
import { useGetComplaintOrRequestStatusReport } from "../_core/_hooks";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import { StackedComplaintOrRequestCharts } from "../../../../_cloner/partials/charts/StackedComplaintOrRequestCharts";

const ComplaintOrRequestStatus = () => {
    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const { mutate, data, isLoading, isError } =
        useGetComplaintOrRequestStatusReport();

    useEffect(() => {
        const formData = {
            fromDate: moment(setDateOneMonth().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
        };
        mutate(formData);
        // eslint-disable-next-line
    }, []);

    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
        };
        mutate(formData);
    };

    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
        };
        mutate(formData);
    };

    return (
        <>
            <Card6 image="" title="گزارش آماری وضعیت شکایت یا درخواست">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4 w-50">
                        <div className="py-1 w-full">
                            <CustomDatepicker
                                // title="از تاریخ"
                                placeholder="از تاریخ"
                                onChange={(d: any) => fromDateChange(d)}
                                defaultValue={setDateOneMonth().getTime()}
                            />
                        </div>
                        <div className="py-1 w-full">
                            <CustomDatepicker
                                // title="تا تاریخ"
                                placeholder="تا تاریخ"
                                onChange={(d: any) => toDateChange(d)}
                                defaultValue={new Date().getTime()}
                            />
                        </div>
                    </div>
                </div>
                {/* <StackedCharts
                        data={data}
                        categories={data?.map(
                            (item: any) => item.contractorName
                        )}
                        isLoading={isLoading}
                        isError={isError}
                        text=""
                    /> */}
                <StackedComplaintOrRequestCharts
                    data={data}
                    categories={data?.map((item: any) => item.contractName)}
                    isLoading={isLoading}
                    isError={isError}
                    text=""
                />
                {/* <VerticalCategoryRequestOrComplaintCharts
                    data={data?.map((item: any) => item.complaintDoingCount)}
                    data1={data?.map((item: any) => item.requestDoingCount)}
                    data2={data?.map((item: any) => item.complaintEndedCount)}
                    data3={data?.map((item: any) => item.requestEndedCount)}
                    categories={data?.map((item: any) => item.contractName)}
                    title1={"شکایت / درحال انجام"}
                    title2={"درخواست / درحال انجام"}
                    title3={"شکایت / پایان یافته"}
                    title4={"درخواست / پایان یافته"}
                    isLoading={isLoading}
                    isError={isError}
                    text=""
                /> */}
            </Card6>
        </>
    );
};

export default ComplaintOrRequestStatus;
