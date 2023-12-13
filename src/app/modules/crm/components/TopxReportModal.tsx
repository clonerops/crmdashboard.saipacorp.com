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
import { useGetTopxReport } from "../_core/_hooks";
import CustomInput from "../../../../_cloner/helpers/components/CustomInput";
import { TopxReportModalTable } from "./TopxReportModalTable";

interface IProps {
    isOpen: boolean;
    setIsOpen: any;
    data?: any;
}

const TopxReportModal: FC<IProps> = ({ isOpen, setIsOpen }) => {

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
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="container mt-4 mb-4">
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

export default TopxReportModal;
