import { useEffect, useState } from "react";
import {
    useGetCarEvulationReport,
    useGetQuestionChangeSurvery,
} from "../_core/_hooks";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownQuestionSurvery } from "../helpers/dropdownSaleTotalType";
import { useGetProvinces } from "../../dealer/core/_hooks";
import { dropdownProvinces } from "../../dealer/helpers/dropdownDealers";
import { pieChartCarEvaluationConvert } from "../../../../_cloner/helpers/pieChartConvert";
import { PieCharts } from "../../../../_cloner/partials/charts/PieCharts";

const carGroupList= [
    {value: 71, label: "شاهین اتومات"},
    {value: 95, label: "چانگان"}
]

const CarEvaluationReportBasedOfProvince = () => {
    const { mutate, data, isLoading, isError } = useGetCarEvulationReport();
    const surveryQuestion = useGetQuestionChangeSurvery();
    const { data: provinces } = useGetProvinces();
    const [questionSelect, setQuestionSelect] = useState<any>({value: 1, label: "فرآیند فروش و تحویل خودرو"});
    const [carSelect, setCarSelect] = useState<any>({value: 71, label: "شاهین اتومات"});
    const [provinceSelect, setProvinceSelect] = useState<any>({
        value: 1,
        label: "تهران",
    });

    useEffect(() => {
        const formData = {
            qustionNo: 1,
            carGroupID: 71,
            provinceId: 1
        };
        mutate(formData);
        // eslint-disable-next-line
    }, []);

    const dataConvert = [
        { id: 8, title: "خیلی زیاد", count: data?.countAllVeryMuch },
        { id: 4, title: "زیاد", count: data?.countAllMuch },
        { id: 3, title: "متوسط", count: data?.countAllMedium },
        { id: 2, title: "کم", count: data?.countAllLow },
        { id: 7, title: "خیلی کم", count: data?.countAllVeryLow },
        { id: 6, title: "نظری ندارم", count: data?.countAllNoIdea },
    ];

    const dataYesOrNo = [
        { id: 5, title: "خیر", count: data?.countAllNo },
        { id: 9, title: "بله", count: data?.countAllYes },
    ]

    const onChangeQuestion = (selectOption: any) => {
        setQuestionSelect(selectOption)
        const formData = {
            qustionNo: selectOption?.value,
            carGroupID: carSelect?.value,
            provinceId: provinceSelect?.value
        };
        mutate(formData);
    };
    const onChangeCar = (selectOption: any) => {
        setCarSelect(selectOption)
        const formData = {
            qustionNo: questionSelect?.value,
            carGroupID: selectOption?.value,
            provinceId: provinceSelect?.value
        };
        mutate(formData);
    };

    const provinceOnChange = (selectedOption: any) => {
        setProvinceSelect(selectedOption);
        const formData = {
            qustionNo: questionSelect?.value,
            carGroupID: carSelect?.value,
            provinceId: selectedOption?.value
        };
        mutate(formData);
    };


    let fetchingData = [2,5,7].includes(questionSelect?.value) ? dataYesOrNo : dataConvert

    return (
        <>
            <Card6
                image=""
                title="گزارش ارزیابی خودروهای چانگان و شاهین اتومات به تفکیک استان - براساس پارامترهای نظرسنجی"
            >
                <div className="flex flex-col">
                    <div className="flex justify-between items-center flex-col md:flex-row gap-4">
                        <div className="py-1 w-full md:w-[50%]">
                            <ProfessionalSelect
                                options={carGroupList}
                                onChange={onChangeCar}
                                value={carSelect}
                                placeholder=""
                            />
                        </div>
                        <div className="py-1 w-full md:w-[50%]">
                            <ProfessionalSelect
                                options={ dropdownQuestionSurvery(surveryQuestion?.data)}
                                onChange={onChangeQuestion}
                                value={questionSelect}
                                placeholder=""
                            />
                        </div>
                        <div className="py-1 w-full md:w-[50%]">
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
                        تعداد کل شرکت کنندگان: {data?.countAll}
                    </div>
                </div>
                <PieCharts
                    // data={fetchingData.map((item: any) => item.count)}
                    // categories={fetchingData?.map((item: any) => item.title)}
                    data={pieChartCarEvaluationConvert(fetchingData)}
                    isLoading={isLoading}
                    isError={isError}
                    text=""
                />
            </Card6>
        </>
    );
};

export default CarEvaluationReportBasedOfProvince;
