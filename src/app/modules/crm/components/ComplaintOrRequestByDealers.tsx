import moment from "moment-jalaali";
import { useEffect, useState } from "react";
import {
    useGetComplaintOrRequestByDealersReport,
} from "../_core/_hooks";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import { HorizontalGroupCharts } from "../../../../_cloner/partials/charts/HorizontalGroupCharts";

const ComplaintOrRequestByDealers = () => {
    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const { mutate, data, isLoading, isError } =
        useGetComplaintOrRequestByDealersReport();

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
            <Card6 image="" title="گزارش آماری شکایت یا درخواست براساس حوزه های مختلف">
                <div className="flex flex-col">
                    <div className="md:flex md:flex-row md:gap-4 w-full md:w-[50%]">
                        <div className="py-1 w-full">
                            <CustomDatepicker
                                title="از تاریخ"
                                placeholder="از تاریخ"
                                onChange={(d: any) => fromDateChange(d)}
                                defaultValue={setDateOneMonth().getTime()}
                            />
                        </div>
                        <div className="py-1 w-full">
                            <CustomDatepicker
                                title="تا تاریخ"
                                placeholder="تا تاریخ"
                                onChange={(d: any) => toDateChange(d)}
                                defaultValue={new Date().getTime()}
                            />
                        </div>
                    </div>
                </div>
                <HorizontalGroupCharts
                    data={data?.map((item: any) => item.countAll)}
                    data1={data?.map((item: any) => item.finishedCount)}
                    categories={data?.map((item: any) => item.contract)}
                    title1={"تعداد کل"}
                    title2={"تعداد یایان یافته"}
                    isLoading={isLoading}
                    isError={isError}
                    text=""
                />
            </Card6>
        </>
    );
};

export default ComplaintOrRequestByDealers;
