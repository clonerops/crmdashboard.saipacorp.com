import moment from "moment-jalaali";
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
    useGetSaleByProductDepositorsReport,
    useGetSaleTotalTypeDetails,
    useGetSaleTotalTypes,
} from "../_core/_hooks";
import { setDateOneWeek } from "../../../../_cloner/helpers/reusableFunction";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import { VerticalCharts3D } from "../../../../_cloner/partials/charts/VerticalCharts3D";

const SaleByProductDepositorsReport = () => {
    const [fromDate, setFromDate] = useState(setDateOneWeek().getTime());
    const [toDate, setToDate] = useState("");

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

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const [calculateTotalCount, setCalculateTotalCount] = useState(0);

    const { data: saleTotalTypes } = useGetSaleTotalTypes();
    const { data: saleTotalDate } = useGetDeliverDates();

    const { mutate: totalDetails, data: saleTotalTypeDetails } =
        useGetSaleTotalTypeDetails();
    const {
        mutate: saleProductDepositorsReport,
        data: saleProductDepositors,
        isLoading,
        isError,
    } = useGetSaleByProductDepositorsReport();

    const calculateSum = (data: any) => {
        const calculateTotal = data?.reduce(
            (accumulator: any, currentValue: any) => {
                return accumulator + currentValue.count;
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
            priority: 0,
            fromDate: moment(setDateOneWeek().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
        };
        totalDetails(totalTypesSelect?.value);
        saleProductDepositorsReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
            priority: totalDateSelect?.value,
        };
        saleProductDepositorsReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };

    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            saletypeId: totalTypesSelect?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
            priority: totalDateSelect?.value,
        };
        saleProductDepositorsReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };

    const onChangeTotalTypes = (selectOption: any) => {
        setTotalTypesSelect(selectOption);
        totalDetails(selectOption?.value);
        const formData = {
            saletypeId: selectOption?.value,
            saleTotalTypeDetailId: totalTypeDetailSelect?.value,
            isJavani: radioSelect,
            priority: totalDateSelect?.value,
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
        };
        saleProductDepositorsReport(formData, {
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
            priority: totalDateSelect?.value,
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
        };
        saleProductDepositorsReport(formData, {
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
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            priority: selectOption?.value,
        };
        saleProductDepositorsReport(formData, {
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
            priority: totalDateSelect?.value,
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
        };
        saleProductDepositorsReport(formData, {
            onSuccess: (data) => {
                calculateSum(data);
            },
            onError: () => {
                setCalculateTotalCount(0);
            },
        });
    };

    return (
        <Card6 image="" title="گزارش آماری براساس واریزکنندگان خودرو">
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

                    <div className="py-1 w-full">
                        <CustomDatepicker
                            title="از تاریخ"
                            placeholder="از تاریخ"
                            onChange={(d: any) => fromDateChange(d)}
                            defaultValue={setDateOneWeek().getTime()}
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
                <div className="md:grid md:grid-cols-3 md:gap-4 my-2">
                    <div>
                        <RadioGroupSaleType
                            onChange={onChangeRadioSelect}
                            id="saleTotalTypeProductDepositors"
                            key="saleTotalTypeProductDepositors"
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
                    <VerticalCharts3D
                        data={saleProductDepositors?.map(
                            (item: any) => item.count
                        )}
                        categories={saleProductDepositors?.map(
                            (item: any) => item.carType
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

export default SaleByProductDepositorsReport;
