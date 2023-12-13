import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import moment from "moment-jalaali";
import {  useGetCarTypes, useGetTopxReport, useGetTopxReportBasedOfFilter } from "../_core/_hooks";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import CustomInput from "../../../../_cloner/helpers/components/CustomInput";
import SaleInvociedModal from "../../esale/components/SaleInvociedModal";
import TopxReportModal from "./TopxReportModal";
import TopxReportModalBasedOfFilter from "./TopxReportModalBasedOfFilter";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownCarType } from "../helpers/dropdownSaleTotalType";




const TopxReportBasedOfFilter = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");
    const [top, setTop] = useState(10)
    const [kilometrFrom, setKilometrFrom] = useState(0)
    const [kilometrTo, setKilometrTo] = useState(0)
    const [carSelect, setCarSelect] = useState<any>({value: 1, label: "سيتروئن"});

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const {
        mutate,
        data,
        isLoading,
        isError,
    } = useGetTopxReportBasedOfFilter();

    const {data: carGroupList} = useGetCarTypes()

    useEffect(() => {
        const formData = {
            fromDate: moment(setDateOneMonth().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
            top: 10,
            kilometrFrom: 0,
            kilometrTo: 0,
            carGroupID: 1
        };
        mutate(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
            top: +top,
            kilometrFrom: kilometrFrom,
            kilometrTo: kilometrTo,
            carGroupID: carSelect?.value

        };
        mutate(formData);
    };
    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
            top: +top,
            kilometrFrom: kilometrFrom,
            kilometrTo: kilometrTo,
            carGroupID: carSelect?.value

        };
        mutate(formData);
    };

    const onChnageTopx = (event: any) => {
        setTop(event.target.value)
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            top: +event.target.value,
            kilometrFrom: kilometrFrom,
            kilometrTo: kilometrTo,
            carGroupID: carSelect?.value

        };
        mutate(formData);
    }

    const onChnageKilometrFrom = (event: any) => {
        setKilometrFrom(event.target.value)
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            top: +top,
            kilometrFrom: event.target.value,
            kilometrTo: kilometrTo,
            carGroupID: carSelect?.value

        };
        mutate(formData);
    }

    const onChnageKilometrTo = (event: any) => {
        setKilometrTo(event.target.value)
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            top: +top,
            kilometrFrom: kilometrFrom,
            kilometrTo: event.target.value,
            carGroupID: carSelect?.value

        };
        mutate(formData);
    }

    const onChangeCar = (selectOption: any) => {
        setCarSelect(selectOption)
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            top: +top,
            kilometrFrom: kilometrFrom,
            kilometrTo: kilometrTo,
            carGroupID: selectOption?.value,
        };
        mutate(formData);
    };


    return (
        <Card6 image="" title="گزارش آماری شکایت/درخواست براساس قطعه/خودرو براساس فیلترهای مختلف">
            <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-4">
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
                    <div className="py-1">
                    <label className="!flex justify-start items-start">خودرو</label>
                        <ProfessionalSelect
                            options={dropdownCarType(carGroupList)}
                            onChange={onChangeCar}
                            value={carSelect}
                            placeholder=""
                        />
                    </div>
                    </div>
                    <div className="py-1 w-full">
                    <label className="!flex justify-start items-start">کیلومتر از</label>
                        <CustomInput
                            title="کیلومتر از"
                            value={kilometrFrom}
                            onChange={(e: any) =>onChnageKilometrFrom(e)}
                            defaultValue={10}
                        />
                    </div>
                    <div className="py-1 w-full">
                    <label className="!flex justify-start items-start">کیلومتر تا</label>
                        <CustomInput
                            title="کیلومتر تا"
                            value={kilometrTo}
                            onChange={(e: any) =>onChnageKilometrTo(e)}
                            defaultValue={10}
                        />
                    </div>
                </div>
                <div className="py-1 w-full">
                        <button onClick={() => setIsOpen(true)} className="w-full">
                                مشاهده جزئیات
                        </button>
                    </div>

            </div>
            <VerticalCharts
                data={data?.map((item: any) => item.فراوانی)}
                categories={data?.map((item: any) => item.part_desc)}
                isLoading={isLoading}
                isError={isError}
                text=""
            />
            <TopxReportModalBasedOfFilter isOpen={isOpen} setIsOpen={setIsOpen} />

        </Card6>
    );
};

export default TopxReportBasedOfFilter;
