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
import { useGetSurveryReport, useGetTopxReport } from "../_core/_hooks";
import CustomInput from "../../../../_cloner/helpers/components/CustomInput";
import { TopxReportModalTable } from "./TopxReportModalTable";
import { dropdownProvinces } from "../../dealer/helpers/dropdownDealers";
import { useGetProvinces } from "../../dealer/core/_hooks";
import { SuerveryModalTable } from "./SurveryModalTable";

interface IProps {
    isOpen: boolean;
    setIsOpen: any;
    data?: any;
}

const carGroupList= [
    {value: 71, label: "شاهین اتومات"},
    {value: 95, label: "چانگان"}
]


const ServuryReportModal: FC<IProps> = ({ isOpen, setIsOpen }) => {

    const [carSelect, setCarSelect] = useState<any>({value: 71, label: "شاهین اتومات"});
    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");
    const [provinceSelect, setProvinceSelect] = useState<any>({
        value: 1,
        label: "تهران",
    });

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const {
        mutate,
        data: survery,
        isLoading,
        isError,
    } = useGetSurveryReport();
    const { data: provinces } = useGetProvinces();

    useEffect(() => {
        const formData = {
            fromDate: moment(setDateOneMonth().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
            carGroupID: 71,
        };
        mutate(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
            carGroupID: carSelect?.value
        };
        mutate(formData);
    };
    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
            carGroupID: carSelect?.value
        };
        mutate(formData);
    };

    const onChangeCar = (selectOption: any) => {
        setCarSelect(selectOption)
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            carGroupID: selectOption?.value,
        };
        mutate(formData);
    };

    const provinceOnChange = (selectedOption: any) => {
        setProvinceSelect(selectedOption);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            carGroupID: carSelect?.value,
            provinceId: selectedOption?.value
        };
        mutate(formData);
    };

    let filteredCountAll = survery?.filter((value: any) => value.question === 'CountAll')
    let filteredWithoutCountAll = survery?.filter((value: any) => value.question !== 'CountAll')



    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="container mt-4 mb-4">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4">
                        <div className="py-1 w-full">
                            <CustomDatepicker
                                placeholder="از تاریخ"
                                onChange={(d: any) => fromDateChange(d)}
                                defaultValue={setDateOneMonth().getTime()}
                            />
                        </div>
                        <div className="py-1 w-full">
                            <CustomDatepicker
                                placeholder="تا تاریخ"
                                onChange={(d: any) => toDateChange(d)}
                                defaultValue={new Date().getTime()}
                            />
                        </div>
                        <div className="py-1 w-full">
                            <ProfessionalSelect
                                options={carGroupList}
                                onChange={onChangeCar}
                                value={carSelect}
                                placeholder=""
                            />
                        </div>
                        <div className="py-1 w-full">
                            <ProfessionalSelect
                                options={dropdownProvinces(provinces)}
                                onChange={provinceOnChange}
                                value={provinceSelect}
                                defaultValue={{
                                    value: 1,
                                    label: "تهران",
                                }}
                                placeholder=""
                            />
                            </div>

                    </div>
                    <div className="py-1 w-full flex justify-end font-bold text-xl">
                        تعداد کل شرکت کنندگان در نظرسنجی: {filteredCountAll?.length > 0 ? filteredCountAll[0]?.questionCount : 0}
                    </div>
                </div>
            </div>
            <SuerveryModalTable
                className=""
                data={survery}
                isError={isError}
                isLoading={isLoading}
            />
        </Modal>
    );
};

export default ServuryReportModal;
