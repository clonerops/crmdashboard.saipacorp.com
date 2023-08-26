import { useEffect, useState } from "react";
import { useGetDealers, useGetSurveryQuestion } from "../core/_hooks";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownDealers } from "../helpers/dropdownDealers";
import { VerticalCategoryDealerQuestionCharts } from "./VerticalCategoryDealerQuestionCharts";
// import moment from "moment-jalaali";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
// import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";

const DealersQuestionReport = () => {
    const [dealersSelect, setDealersSelect] = useState<any>({
        value: 0,
        label: "همه",
    });
    // const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    // const [toDate, setToDate] = useState("");

    // let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    // let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    // let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const { data: dealers } = useGetDealers();

    const { mutate, data, isLoading, isError } = useGetSurveryQuestion();

    const dealerOnChange = (selectedOption: any) => {
        setDealersSelect(selectedOption);
        const formData = {
            dealerId: selectedOption.value,
            // fromDate: moment(setDateOneMonth().getTime()).format(
            //     "jYYYY/jMM/jDD"
            // ),
            // toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
        };
        mutate(formData);
    };

    // const fromDateChange = (d: any) => {
    //     setFromDate(d.value);
    //     const formData = {
    //         fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
    //         toDate: toDate ? calculateToDate : calculateNowDate,
    //         dealerId: dealersSelect.value,
    //     };
    //     mutate(formData);
    // };

    // const toDateChange = (d: any) => {
    //     setToDate(d);
    //     const formData = {
    //         fromDate: fromDate ? calculateFromDate : calculateNowDate,
    //         toDate: moment(d.value).format("jYYYY/jMM/jDD"),
    //         dealerId: dealersSelect.value,
    //     };
    //     mutate(formData);
    // };

    useEffect(() => {
        const formData = {
            // fromDate: "0",
            // toDate: "0",
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
                        {/* <div className="py-1 w-full">
                            <label>از تاریخ</label>
                            <CustomDatepicker
                                // title="از تاریخ"
                                placeholder="از تاریخ"
                                onChange={(d: any) => fromDateChange(d)}
                                defaultValue={setDateOneMonth().getTime()}
                            />
                        </div>
                        <div className="py-1 w-full">
                            <label>تا  تاریخ</label>

                            <CustomDatepicker
                                // title="تا تاریخ"
                                placeholder="تا تاریخ"
                                onChange={(d: any) => toDateChange(d)}
                                defaultValue={new Date().getTime()}
                            />
                        </div> */}
                    </div>
                    <div className="flex flex-row justify-end items-end gap-x-4 mb-4">
                        <div className="py-1">
                            <label className="font-yekan_bold text-xl">
                                {`تعداد شرکت کنندگان در نظرسنجی: `}
                                <span className="text-green-700">
                                    {data?.customersCount}
                                </span>
                            </label>
                        </div>
                        <div className="py-1">
                            <label className="font-yekan_bold text-xl">
                                {`میانگین ستاره های اخذ شده: `}
                                <span className="text-green-700">
                                    {Math.floor(
                                        data?.dealerSatisfactionRate /
                                            data?.customersCount
                                    )}
                                </span>
                            </label>
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
