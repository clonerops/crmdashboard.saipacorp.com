import { useEffect, useState } from "react";
import {
    useGetCarEvulationReport,
    useGetQuestionChangeSurvery,
} from "../_core/_hooks";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import { StackedComplaintOrRequestCharts } from "../../../../_cloner/partials/charts/StackedComplaintOrRequestCharts";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownSaleTotalType } from "../../esale/helpers/dropdownSaleTotalType";
import { dropdownQuestionSurvery } from "../helpers/dropdownSaleTotalType";

const CarEvaluationReport = () => {
    const { mutate, data, isLoading, isError } = useGetCarEvulationReport();
    const surveryQuestion = useGetQuestionChangeSurvery();
    const [questionSelect, setQuestionSelect] = useState<any>({
        value: 0,
        label: "همه",
    });

    useEffect(() => {
        const formData = {
            qustionNo: 1,
            carGroupID: 71,
        };
        mutate(formData);
        // eslint-disable-next-line
    }, []);

    const dataConvert = [
        { id: 1, title: "تعداد کل", count: data?.countAll },
        { id: 2, title: "کم", count: data?.countAllLow },
        { id: 3, title: "متوسط", count: data?.countAllMedium },
        { id: 4, title: "زیاد", count: data?.countAllMuch },
        { id: 5, title: "خیر", count: data?.countAllNo },
        { id: 6, title: "نظری ندارم", count: data?.countAllNoIdea },
        { id: 7, title: "خیلی کم", count: data?.countAllVeryLow },
        { id: 8, title: "خیلی زیاد", count: data?.countAllVeryMuch },
        { id: 9, title: "بله", count: data?.countAllYes },
    ];

    const onChangeQuestion = (selectOption: any) => {
        setQuestionSelect(selectOption)
        const formData = {
            qustionNo: selectOption?.value,
            carGroupID: 71,
        };
        mutate(formData);
    };


    return (
        <>
            <Card6
                image=""
                title="گزارش ارزیابی خودروهای چانگان و شاهین اتومات"
            >
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4 w-50">
                        <div className="py-1 w-full">
                            <ProfessionalSelect
                                options={
                                    surveryQuestion?.data === undefined
                                        ? [{ value: 0, label: "همه" }]
                                        : dropdownQuestionSurvery([
                                              {
                                                  questionNo: 0,
                                                  question: "همه",
                                              },
                                              ...surveryQuestion?.data,
                                          ])
                                }
                                onChange={onChangeQuestion}
                                value={questionSelect}
                                defaultValue={{
                                    value: 0,
                                    label: "همه",
                                }}
                                placeholder=""
                            />
                        </div>
                        <div className="py-1 w-full"></div>
                    </div>
                </div>
                <VerticalCharts
                    data={dataConvert.map((item: any) => item.count)}
                    categories={dataConvert?.map((item: any) => item.title)}
                    isLoading={isLoading}
                    isError={isError}
                    text=""
                />
            </Card6>
        </>
    );
};

export default CarEvaluationReport;
