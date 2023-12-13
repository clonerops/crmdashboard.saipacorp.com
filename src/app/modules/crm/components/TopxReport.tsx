import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import moment from "moment-jalaali";
import {  useGetTopxReport } from "../_core/_hooks";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import CustomInput from "../../../../_cloner/helpers/components/CustomInput";
import SaleInvociedModal from "../../esale/components/SaleInvociedModal";
import TopxReportModal from "./TopxReportModal";




const TopxReport = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");
    const [top, setTop] = useState(10)

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const {
        mutate,
        data,
        isLoading,
        isError,
    } = useGetTopxReport();

    useEffect(() => {
        const formData = {
            fromDate: moment(setDateOneMonth().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
            top: 10
        };
        mutate(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
            top: +top
        };
        mutate(formData);
    };
    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
            top: +top
        };
        mutate(formData);
    };

    const onChnageTopx = (event: any) => {
        setTop(event.target.value)
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            top: +event.target.value
        };
        mutate(formData);
    }


    return (
        <Card6 image="" title="گزارش آماری شکایت/درخواست براساس قطعه/خودرو">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="py-1 w-full">
                    <label className="!flex justify-start items-start">از تاریخ</label>
                        <CustomDatepicker
                            placeholder="از تاریخ"
                            onChange={(d: any) => fromDateChange(d)}
                            defaultValue={setDateOneMonth().getTime()}
                        />
                    </div>
                    <div className="py-1 w-full">
                    <label className="!flex justify-start items-start">تا تاریخ</label>
                        <CustomDatepicker
                            placeholder="تا تاریخ"
                            onChange={(d: any) => toDateChange(d)}
                            defaultValue={new Date().getTime()}
                        />
                    </div>
                    <div className="py-1 w-full">
                    <label className="!flex justify-start items-start">تعداد نمایش</label>
                        <CustomInput
                            title="تعداد نمایش"
                            value={top}
                            onChange={(e: any) =>onChnageTopx(e)}
                            defaultValue={10}
                        />
                    </div>
                    <div className="py-1 w-full">
                        <button onClick={() => setIsOpen(true)} className="w-full">
                                مشاهده جزئیات
                        </button>
                    </div>
                </div>
            </div>
            <VerticalCharts
                data={data?.map((item: any) => item.فراوانی)}
                categories={data?.map((item: any) => item.part_desc)}
                isLoading={isLoading}
                isError={isError}
                text=""
            />
            <TopxReportModal isOpen={isOpen} setIsOpen={setIsOpen} />

        </Card6>
    );
};

export default TopxReport;
