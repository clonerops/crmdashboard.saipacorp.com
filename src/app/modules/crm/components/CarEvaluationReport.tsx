import { useEffect, useState } from "react";
import {
    useGetCarEvulationReport,
    useGetQuestionChangeSurvery,
} from "../_core/_hooks";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownQuestionSurvery } from "../helpers/dropdownSaleTotalType";

const carGroupList= [
    {value: 71, label: "شاهین اتومات"},
    {value: 95, label: "چانگان"}
]

const CarEvaluationReport = () => {
    const { mutate, data, isLoading, isError } = useGetCarEvulationReport();
    const surveryQuestion = useGetQuestionChangeSurvery();
    const [questionSelect, setQuestionSelect] = useState<any>({value: 1, label: "فرآیند فروش و تحویل خودرو"});
    const [carSelect, setCarSelect] = useState<any>({value: 71, label: "شاهین اتومات"});

    useEffect(() => {
        const formData = {
            qustionNo: 1,
            carGroupID: 71,
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
        };
        mutate(formData);
    };
    const onChangeCar = (selectOption: any) => {
        setCarSelect(selectOption)
        const formData = {
            qustionNo: questionSelect?.value,
            carGroupID: selectOption?.value,
        };
        mutate(formData);
    };

    let fetchingData = [2,5,7].includes(questionSelect?.value) ? dataYesOrNo : dataConvert

    return (
        <>
            <Card6
                image=""
                title="گزارش ارزیابی خودروهای چانگان و شاهین اتومات - براساس پارامترهای نظرسنجی"
            >
                <div className="flex flex-col">
                    <div className="flex justify-between items-center flex-row gap-4">
                        <div className="py-1 w-50">
                            <ProfessionalSelect
                                options={ dropdownQuestionSurvery(surveryQuestion?.data)}
                                onChange={onChangeQuestion}
                                value={questionSelect}
                                placeholder=""
                            />
                        </div>
                        <div className="py-1 w-50">
                            <ProfessionalSelect
                                options={carGroupList}
                                onChange={onChangeCar}
                                value={carSelect}
                                placeholder=""
                            />
                        </div>
                        <div className="py-1 w-full flex justify-end font-bold text-xl">
                            تعداد کل شرکت کنندگان در نظرسنجی: {data?.countAll}
                        </div>
                    </div>
                </div>
                <VerticalCharts
                    data={fetchingData.map((item: any) => item.count)}
                    categories={fetchingData?.map((item: any) => item.title)}
                    isLoading={isLoading}
                    isError={isError}
                    text=""
                />
            </Card6>
        </>
    );
};

export default CarEvaluationReport;
