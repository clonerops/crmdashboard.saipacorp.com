import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import RadioGroupSaleType from "./RadioGroupSaleType";
import {
    useGetSaleByProductPriorityAndSaleDetailReport,
    useGetSaleTotalTypeDetails,
    useGetSaleTotalTypes,
} from "../_core/_hooks";
import ProfessionalSelect from "./ProfessionalSelect";
import {
    dropdownSaleTotalType,
    dropdownSaleTotalTypeDetails,
} from "../helpers/dropdownSaleTotalType";
import { StackedCharts } from "../../../../_cloner/partials/charts/StackedCharts";

const SaleTotalProductAndDateReport = () => {
    const [radioSelect, setRadioSelect] = useState(-1);
    const [totalTypesSelect, setTotalTypesSelect] = useState<any>({
        value: 2,
        label: "فروش یکپارچه",
    });
    const [totalTypeDetailSelect, setTotalTypeDetailSelect] = useState<any>({
        value: 0,
        label: "همه",
    });

    const [calculateTotalCount, setCalculateTotalCount] = useState(0);
    const { data: saleTotalTypes } = useGetSaleTotalTypes();
    const { mutate: totalDetails, data: saleTotalTypeDetails } =
        useGetSaleTotalTypeDetails();

    const {
        mutate: saleReport,
        data: saleReportData,
        isLoading,
        isError,
    } = useGetSaleByProductPriorityAndSaleDetailReport();

    const calculateSum = (data: any) => {
        const calculateTotal = data?.reduce(
            (accumulator: any, currentValue: any) => {
                return accumulator + currentValue.cnT_ALL;
            },
            0
        );
        setCalculateTotalCount(calculateTotal);
    };

    useEffect(() => {
        const formData = {
            saletypeId: 2,
            saleTotalTypeDetailId: 0,
            isJavani: -1,
        };
        totalDetails(totalTypesSelect?.value);
        saleReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
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
        };
        saleReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };
    const onChangeTotalTypeDetail = (selectOption: any) => {
        setTotalTypeDetailSelect(selectOption);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: selectOption?.value,
            isJavani: radioSelect,
        };
        saleReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };

    const onChangeRadioSelect = (event: any) => {
        setRadioSelect(event.target.value);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: event.target.value,
        };

        saleReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };
    return (
        <Card6 image="" title="گزارش آماری فروش اولویت تحویل و منتخبین">
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
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-4 my-2">
                    <div>
                        <RadioGroupSaleType
                            onChange={onChangeRadioSelect}
                            id="saleTotalTypeDetail"
                            key="saleTotalTypeDetail"
                        />
                    </div>
                    <label className="flex items-center justify-center">
                        تعداد کل:{" "}
                        <span className="font-yekan_extrabold text-xl text-indigo-700 px-4">
                            {calculateTotalCount}
                        </span>
                    </label>
                </div>
                <div>
                    <StackedCharts
                        data={saleReportData}
                        categories={saleReportData?.map(
                            (item: any) => item.deliverdatE_DESC
                        )}
                        isLoading={isLoading}
                        isError={isError}
                        text=""
                    />
                </div>
            </div>
        </Card6>
    );
};

export default SaleTotalProductAndDateReport;
