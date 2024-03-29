import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "./ProfessionalSelect";
import {
    dropdownSaleTotalType,
    dropdownSaleTotalTypeDetails,
    dropdownSaleTotalWinnerType,
    dropdownTotalDate,
} from "../helpers/dropdownSaleTotalType";
import RadioGroupSaleType from "./RadioGroupSaleType";
import {
    useGetDeliverDates,
    useGetSaleByProductPriorityReport,
    useGetSaleTotalTypeDetails,
    useGetSaleTotalTypes,
    useGetWinnerTypes,
} from "../_core/_hooks";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";

const SaleByProductPriorityReport = () => {
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
    const [totalWinnerTypeSelect, setTotalwinnerTypeSelect] = useState<any>({
        value: -1,
        label: "همه",
    });

    const [calculateTotalCount, setCalculateTotalCount] = useState(0);

    const { data: saleTotalTypes } = useGetSaleTotalTypes();
    const { data: saleWinnerType } = useGetWinnerTypes();
    const { data: saleTotalDate } = useGetDeliverDates();

    const { mutate: totalDetails, data: saleTotalTypeDetails } =
        useGetSaleTotalTypeDetails();
    const {
        mutate: saleProductPriorityReport,
        data: saleProductPriority,
        isLoading,
        isError,
    } = useGetSaleByProductPriorityReport();

    const calculateSum = (data: any) => {
        const calculateTotal = data?.reduce(
            (accumulator: any, currentValue: any) => {
                return accumulator + currentValue.cnt;
            },
            0
        );
        setCalculateTotalCount(calculateTotal);
    };

    useEffect(() => {
        const formData = {
            saletypeId: 2,
            saleTotalTypeDetailId: 0,
            priority: 0,
            isJavani: -1,
            winnerType: -1,
        };
        totalDetails(totalTypesSelect?.value);
        saleProductPriorityReport(formData, {
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
            saleTotalTypeDetailId: 0,
            priority: 0,
            isJavani: radioSelect,
            winnerType: totalWinnerTypeSelect?.value,
        };
        saleProductPriorityReport(formData, {
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
            priority: 0,
            winnerType: totalWinnerTypeSelect?.value,
        };
        saleProductPriorityReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
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
            winnerType: totalWinnerTypeSelect?.value,
        };
        saleProductPriorityReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };
    const onChangeTotalWinnerType = (selectOption: any) => {
        setTotalwinnerTypeSelect(selectOption);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            priority: totalDateSelect?.value,
            winnerType: selectOption?.value,
        };
        saleProductPriorityReport(formData, {
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
            priority: totalDateSelect?.value,
            isJavani: event.target.value,
            winnerType: totalWinnerTypeSelect?.value,
        };
        saleProductPriorityReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };

    return (
        <Card6 image="" title="گزارش آماری براساس محصول اولویت">
            <div className="flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-4">
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
                        // options={dropdownSaleTotalTypeDetails(
                        //     saleTotalTypeDetails
                        // )}
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
                        // options={dropdownTotalDate(saleTotalDate)}
                        onChange={onChangeTotalDate}
                        value={totalDateSelect}
                        defaultValue={{ value: 0, label: "همه" }}
                        placeholder=""
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-4 my-2">
                    <div>
                        <RadioGroupSaleType
                            onChange={onChangeRadioSelect}
                            id="saleTotalTypeProductPriority"
                            key="saleTotalTypeProductPriority"
                        />
                    </div>
                    <div>
                        <ProfessionalSelect
                            options={
                                saleWinnerType === undefined
                                    ? [{ value: -1, label: "همه" }]
                                    : dropdownSaleTotalWinnerType([
                                          { id: -1, totalTypeDesc: "همه" },
                                          ...saleWinnerType,
                                      ])
                            }
                            // options={dropdownSaleTotalWinnerType(
                            //     saleWinnerType
                            // )}
                            onChange={onChangeTotalWinnerType}
                            value={totalWinnerTypeSelect}
                            defaultValue={{ value: -1, label: "همه" }}
                            placeholder=""
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <label className="flex items-center justify-center">
                            تعداد کل:{" "}
                            <span className="font-yekan_extrabold text-xl text-indigo-700 px-4">
                                {calculateTotalCount}
                            </span>
                        </label>
                    </div>
                </div>
                <div>
                    <VerticalCharts
                        data={saleProductPriority?.map((item: any) => item.cnt)}
                        categories={saleProductPriority?.map(
                            (item: any) => item.car_type_desc
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

export default SaleByProductPriorityReport;
