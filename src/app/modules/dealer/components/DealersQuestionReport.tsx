import { useEffect, useState } from "react";
import { useGetDealers, useGetSurveryQuestion } from "../core/_hooks";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { dropdownDealers } from "../helpers/dropdownDealers";
import { VerticalCategoryDealerQuestionCharts } from "./VerticalCategoryDealerQuestionCharts";
// import moment from "moment-jalaali";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import StarRating from "../../../../_cloner/helpers/components/StarRating";
// import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";

const DealersQuestionReport = () => {
    const [dealersSelect, setDealersSelect] = useState<any>({
        value: 0,
        label: "همه",
    });
    const [rating, setRating] = useState<number>(0);

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
        mutate(formData, {
            onSuccess: (dataItem: any) => {
                setRating(
                    parseFloat(
                        Number(
                            dataItem?.dealerSatisfactionRate /
                                dataItem?.customersCount
                        ).toFixed(2)
                    )
                );
            },
        });
    };
    useEffect(() => {
        const formData = {
            // fromDate: "0",
            // toDate: "0",
            dealerId: 0,
        };

        mutate(formData, {
            onSuccess: (dataItem: any) => {
                setRating(
                    parseFloat(
                        Number(
                            dataItem?.dealerSatisfactionRate /
                                dataItem?.customersCount
                        ).toFixed(2)
                    )
                );
            },
        });
        // eslint-disable-next-line
    }, []);

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

    console.log(parseFloat((25.2554).toFixed(2)));

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
                    <div className="flex flex-row justify-end items-center gap-x-4 mb-4">
                        <div className="py-1">
                            <label className="font-yekan_bold text-xl">
                                {`تعداد شرکت کنندگان در نظرسنجی: `}
                                <span className="text-green-700">
                                    {data?.customersCount}
                                </span>
                            </label>
                            <span className="text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="py-1 flex flex-col justify-end items-end">
                            <label className="font-yekan_bold text-xl">
                                {`میانگین ستاره های اخذ شده: `}
                                <span className="text-green-700">
                                    {parseFloat(
                                        Number(
                                            data?.dealerSatisfactionRate /
                                                data?.customersCount
                                        ).toFixed(2)
                                    )}
                                </span>
                            </label>
                            <StarRating value={rating} />
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
