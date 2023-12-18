import { FC, useEffect, useState } from "react";
import { useGetDeliverDates, useGetSaleByProductInvoicedReportDetail, useGetSaleTotalTypeDetails, useGetSaleTotalTypes } from "../../esale/_core/_hooks";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownSaleTotalType, dropdownSaleTotalTypeDetails, dropdownTotalDate } from "../../esale/helpers/dropdownSaleTotalType";
import RadioGroupSaleType from "../../esale/components/RadioGroupSaleType";
import { SaleInvoicedTable } from "../../esale/components/SaleInvoicedTable";
import Modal from "../../esale/components/Modal";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import moment from "moment-jalaali";
import { useGetCarTypes, useGetTopxReport } from "../_core/_hooks";
import CustomInput from "../../../../_cloner/helpers/components/CustomInput";
import { TopxReportModalTable } from "./TopxReportModalTable";
import { dropdownCarType } from "../helpers/dropdownSaleTotalType";

interface IProps {
    isOpen: boolean;
    setIsOpen: any;
    data?: any;
}

const TopxReportModalBasedOfFilter: FC<IProps> = ({ isOpen, setIsOpen }) => {

    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");
    const [top, setTop] = useState(10)
    const [kilometrFrom, setKilometrFrom] = useState(0)
    const [kilometrTo, setKilometrTo] = useState(null)
    const [carSelect, setCarSelect] = useState<any>();

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const {
        mutate,
        data,
        isLoading,
        isError,
    } = useGetTopxReport();

    const {data: carGroupList} = useGetCarTypes()


    useEffect(() => {
        const formData = {
            fromDate: moment(setDateOneMonth().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
            top: 10,
            kilometrFrom: 0,
            kilometrTo: null,
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
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="container mt-4 mb-4">
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
                    <div className="py-1">
                    <label className="!flex justify-start items-start">خودرو</label>
                        <ProfessionalSelect
                            options={dropdownCarType(carGroupList)}
                            onChange={onChangeCar}
                            value={carSelect}
                            placeholder=""
                        />
                    </div>
                    <div className="py-1 w-full">
                        <label className="!flex justify-start items-start">کیلومتر از</label>
                        <CustomInput
                            title="کیلومتر از"
                            value={kilometrFrom}
                            onChange={(e: any) =>onChnageKilometrFrom(e)}
                            defaultValue={0}
                        />
                    </div>
                    <div className="py-1 w-full">
                    <label className="!flex justify-start items-start">کیلومتر تا</label>
                        <CustomInput
                            title="کیلومتر تا"
                            value={kilometrTo}
                            onChange={(e: any) =>onChnageKilometrTo(e)}
                            defaultValue={null}
                        />
                    </div>

                </div>
            </div>


                <TopxReportModalTable
                    className=""
                    data={data}
                    isError={isError}
                    isLoading={isLoading}
                />
            </div>
        </Modal>
    );
};

export default TopxReportModalBasedOfFilter;
