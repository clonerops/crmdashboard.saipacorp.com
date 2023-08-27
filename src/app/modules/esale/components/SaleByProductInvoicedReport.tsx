import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "./ProfessionalSelect";
import {
    dropdownSaleTotalType,
    dropdownSaleTotalTypeDetails,
    dropdownTotalDate,
} from "../helpers/dropdownSaleTotalType";
import RadioGroupSaleType from "./RadioGroupSaleType";
import {
    useGetDeliverDates,
    useGetSaleByProductInvoicedReport,
    useGetSaleTotalTypeDetails,
    useGetSaleTotalTypes,
} from "../_core/_hooks";
import { VerticalInvoicedCategoryCharts } from "../../../../_cloner/partials/charts/VerticalInvoicedCategoryCharts";
import SaleInvociedModal from "./SaleInvociedModal";

const SaleByProductInvoicedReport = () => {
    const [isOpen, setIsOpen] = useState(false);

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

    const [calculateTotalCount, setCalculateTotalCount] = useState(0);
    const [calculateTotalInvoicedCount, setCalculateTotalInvoicedCount] =
        useState(0);

    const { data: saleTotalTypes } = useGetSaleTotalTypes();
    const { data: saleTotalDate } = useGetDeliverDates();

    const { mutate: totalDetails, data: saleTotalTypeDetails } =
        useGetSaleTotalTypeDetails();
    const {
        mutate: saleProductInvoicedReport,
        data: saleProductInvoiced,
        isLoading,
        isError,
    } = useGetSaleByProductInvoicedReport();

    const calculateSum = (data: any) => {
        const calculateTotal = data?.reduce(
            (accumulator: any, currentValue: any) => {
                return accumulator + currentValue.delivered_count;
            },
            0
        );
        const calculateTotalInvoiced = data?.reduce(
            (accumulator: any, currentValue: any) => {
                return accumulator + currentValue.invoiced_count;
            },
            0
        );
        setCalculateTotalCount(calculateTotal);
        setCalculateTotalInvoicedCount(calculateTotalInvoiced);
    };

    useEffect(() => {
        const formData = {
            saletypeId: 2,
            saleTotalTypeDetailId: 0,
            isJavani: -1,
            priority: 0,
        };
        totalDetails(totalTypesSelect?.value);
        saleProductInvoicedReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
                setCalculateTotalInvoicedCount(0);
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeTotalTypes = (selectOption: any) => {
        setTotalTypesSelect(selectOption);
        totalDetails(selectOption?.value);
        const formData = {
            saletypeId: selectOption?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            priority: totalDateSelect?.value,
        };
        saleProductInvoicedReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
                setCalculateTotalInvoicedCount(0);
            },
        });
    };
    const onChangeTotalTypeDetail = (selectOption: any) => {
        setTotalTypeDetailSelect(selectOption);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: selectOption?.value,
            isJavani: radioSelect,
            priority: totalDateSelect?.value,
        };
        saleProductInvoicedReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
                setCalculateTotalInvoicedCount(0);
            },
        });
    };
    const onChangeTotalDate = (selectOption: any) => {
        setTotalDateSelect(selectOption);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            priority: selectOption?.value,
        };
        saleProductInvoicedReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
                setCalculateTotalInvoicedCount(0);
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
        saleProductInvoicedReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
                setCalculateTotalInvoicedCount(0);
            },
        });
    };

    return (
        <>
            <Card6
                image=""
                title="گزارش آماری فاکتورشده ها و تحویل شده ها براساس خودرو"
            >
                <div className="flex flex-col">
                    <div className="md:grid md:grid-cols-3 md:gap-4">
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
                    <div className="md:grid md:grid-cols-3 md:gap-4 my-2">
                        <div>
                            <RadioGroupSaleType
                                onChange={onChangeRadioSelect}
                                id="saleTotalTypeProductInvoiced"
                                key="saleTotalTypeProductInvoiced"
                            />
                        </div>
                        <div className="flex justify-center items-center gap-8">
                            <button onClick={() => setIsOpen(true)}>
                                مشاهده جزئیات
                            </button>
                            <label className="flex items-center justify-center">
                                تعداد کل تحویل شده:{" "}
                                <span className="font-yekan_extrabold text-xl text-indigo-700 px-4">
                                    {calculateTotalCount}
                                </span>
                            </label>
                        </div>
                        <div className="flex justify-center items-center">
                            <label className="flex items-center justify-center">
                                تعداد کل فاکتور شده:{" "}
                                <span className="font-yekan_extrabold text-xl text-indigo-700 px-4">
                                    {calculateTotalInvoicedCount}
                                </span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <VerticalInvoicedCategoryCharts
                            data={saleProductInvoiced?.map(
                                (item: any) => item.invoiced_count
                            )}
                            data1={saleProductInvoiced?.map(
                                (item: any) => item.delivered_count
                            )}
                            categories={saleProductInvoiced?.map(
                                (item: any) => item.carType
                            )}
                            isLoading={isLoading}
                            isError={isError}
                            text=""
                        />
                    </div>
                </div>
            </Card6>
            <SaleInvociedModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default SaleByProductInvoicedReport;
