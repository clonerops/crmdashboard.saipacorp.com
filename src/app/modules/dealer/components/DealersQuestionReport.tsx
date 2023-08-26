import { useEffect, useState } from "react";
import { useGetDealers, useGetSurveryQuestion } from "../core/_hooks";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownDealers } from "../helpers/dropdownDealers";
import { VerticalCategoryDealerQuestionCharts } from "./VerticalCategoryDealerQuestionCharts";

const DealersQuestionReport = () => {
    const [dealersSelect, setDealersSelect] = useState<any>({
        value: 0,
        label: "همه",
    });

    const { data: dealers } = useGetDealers();

    const { mutate, data, isLoading, isError } = useGetSurveryQuestion();

    const dealerOnChange = (selectedOption: any) => {
        setDealersSelect(selectedOption);
        const formData = {
            provinceId: selectedOption.value,
            dealerId: dealersSelect.value,
        };
        mutate(formData);
    };
    
    useEffect(() => {
        const formData = {
            provinceId: 0,
            dealerId: 0,
        };
        mutate(formData);
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Card6 image="" title="گزارش آماری میزان نظرسنجی براساس نوع سوال">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="py-1">
                            <label>نمایندگی</label>
                            <ProfessionalSelect
                                options={
                                    dealers === undefined
                                        ? [{ value: 0, label: "همه" }]
                                        : dropdownDealers([
                                              { dlR_NO: 0, dlR_NAME: "همه" },
                                              ...dealers,
                                          ])
                                }
                                onChange={dealerOnChange}
                                value={dealersSelect}
                                defaultValue={{
                                    value: 0,
                                    label: "همه",
                                }}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-end gap-x-4 mb-4">
                        <div className="py-1">
                            <label className="font-yekan_bold text-xl">{`تعداد مشتریان: `}<span className="text-green-700">{data?.customersCount}</span></label>
                        </div>
                        <div className="py-1">
                            <label className="font-yekan_bold text-xl">{`تعداد کل نظرسنجی ها: `}<span className="text-green-700">{data?.satisfactionRateSum}</span></label>
                        </div>
                    </div>
                </div>
                <VerticalCategoryDealerQuestionCharts
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    text=""
                />
            </Card6>
        </>
    );
};

export default DealersQuestionReport;
