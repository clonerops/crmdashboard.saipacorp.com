import { FC, useEffect, useState } from "react";
import Modal from "./Modal";
import ProfessionalSelect from "./ProfessionalSelect";
import RadioGroupSaleType from "./RadioGroupSaleType";
import {
    useGetDeliverDates,
    useGetSaleByProductInvoicedReportDetail,
    useGetSaleTotalTypeDetails,
    useGetSaleTotalTypes,
} from "../_core/_hooks";
import {
    dropdownSaleTotalType,
    dropdownSaleTotalTypeDetails,
    dropdownTotalDate,
} from "../helpers/dropdownSaleTotalType";
import { SaleInvoicedTable } from "./SaleInvoicedTable";
import { DownloadExcelFile } from "./DownloadExcel";
import { downloadInvoicedDetailExcel, downloadTotalTypeExcel } from "../_core/_requests";

interface IProps {
    isOpen: boolean;
    setIsOpen: any;
    data?: any;
}

const SaleInvociedModal: FC<IProps> = ({ isOpen, setIsOpen }) => {
    const [excelLoading, setExcelLoading] = useState(false);

    const [radioSelect, setRadioSelect] = useState(-1);
    const [totalTypesSelect, setTotalTypesSelect] = useState<any>({
        value: 2,
        label: "فروش یکپارچه",
    });
    const [totalTypeDetailSelect, setTotalTypeDetailSelect] = useState<any>({
        value: 0,
        label: "همه",
    });
    const [totalDateSelect, setTotalDateSelect] = useState<any>({
        value: 0,
        label: "همه",
    });

    const { data: saleTotalTypes } = useGetSaleTotalTypes();
    const { data: saleTotalDate } = useGetDeliverDates();

    const { mutate: totalDetails, data: saleTotalTypeDetails } =
        useGetSaleTotalTypeDetails();
    const {
        mutate: saleReport,
        data: saleReportData,
        isLoading,
        isError,
    } = useGetSaleByProductInvoicedReportDetail();

    const onChangeTotalTypes = (selectOption: any) => {
        setTotalTypesSelect(selectOption);
        totalDetails(selectOption?.value);
        const formData = {
            saletypeId: selectOption?.value,
            saleTotalTypeDetailId: 0,
            isJavani: radioSelect,
            priority: totalDateSelect?.value,
        };
        saleReport(formData);
    };
    const onChangeTotalTypeDetail = (selectOption: any) => {
        setTotalTypeDetailSelect(selectOption);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: selectOption?.value,
            isJavani: radioSelect,
            priority: totalDateSelect?.value,
        };
        saleReport(formData);
    };
    const onChangeTotalDate = (selectOption: any) => {
        setTotalDateSelect(selectOption);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            priority: selectOption?.value,
        };
        saleReport(formData, {
            onSuccess: (data: any) => {},
            onError: (err: any) => {
                console.log(err);
            },
        });
    };
    const onChangeRadioSelect = (event: any) => {
        setRadioSelect(event.target.value);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: event.target.value,
            priority: totalDateSelect?.value,
        };
        saleReport(formData);
    };

    useEffect(() => {
        const formData = {
            saletypeId: 2,
            saleTotalTypeDetailId: 0,
            isJavani: -1,
            priority: 0,
        };
        totalDetails(totalTypesSelect?.value);
        saleReport(formData);
    }, []);

    const handleDownloadExcel = async () => {
        setExcelLoading(true);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            priority: totalDateSelect?.value,
        };
        try {
            const response = await downloadInvoicedDetailExcel(formData);
            const outputFilename = `InvociedDetail${Date.now()}.csv`;
            DownloadExcelFile(response, outputFilename);
            setExcelLoading(false);
        } catch (error) {
            console.log(error);
            setExcelLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="container mt-4 mb-4">
                <div className="md:grid md:grid-cols-3 md:gap-4 text-start">
                    <ProfessionalSelect
                        options={dropdownSaleTotalType(saleTotalTypes)}
                        onChange={onChangeTotalTypes}
                        value={totalTypesSelect}
                        defaultValue={{ value: 2, label: "فروش یکپارچه" }}
                        placeholder=""
                    />
                    <ProfessionalSelect
                        options={
                            saleTotalTypeDetails === undefined
                                ? [{ value: 0, label: "همه" }]
                                : dropdownSaleTotalTypeDetails([
                                      { id: 0, detailDesc: "همه" },
                                      ...saleTotalTypeDetails,
                                  ])
                        }
                        onChange={onChangeTotalTypeDetail}
                        value={totalTypeDetailSelect}
                        defaultValue={{ value: 0, label: "همه" }}
                        placeholder=""
                    />
                    <ProfessionalSelect
                        options={
                            saleTotalDate === undefined
                                ? [{ value: 0, label: "همه" }]
                                : dropdownTotalDate([
                                      { id: 0, deliverDateDesc: "همه" },
                                      ...saleTotalDate,
                                  ])
                        }
                        onChange={onChangeTotalDate}
                        value={totalDateSelect}
                        defaultValue={{ value: 0, label: "همه" }}
                        placeholder=""
                    />
                </div>
                <RadioGroupSaleType
                    onChange={onChangeRadioSelect}
                    id="saleTotalTypeTables"
                    key="saleTotalTypeTables"
                />

                <div className="flex justify-start items-start">
                    <button
                        disabled={saleReportData === undefined}
                        onClick={handleDownloadExcel}
                        className="text-white rounded-lg bg-green-500 px-8 py-2"
                    >
                        {excelLoading
                            ? "در حال دانلود..."
                            : "دانلود خروجی اکسل"}
                    </button>
                </div>

                <SaleInvoicedTable
                    className=""
                    data={saleReportData}
                    isError={isError}
                    isLoading={isLoading}
                />
            </div>
        </Modal>
    );
};

export default SaleInvociedModal;
