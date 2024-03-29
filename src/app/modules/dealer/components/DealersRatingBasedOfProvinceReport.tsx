import { useEffect, useState } from "react";
import {  useGetProvinces, useGetRatingByProvince } from "../core/_hooks";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import {  dropdownProvinces } from "../helpers/dropdownDealers";
import moment from "moment-jalaali";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import { SplineTwoCharts } from "../../../../_cloner/partials/charts/SplineTwoCharts";

const DealersRatingBasedOfProvinceReport = () => {
    const [provinceSelect, setProvinceSelect] = useState<any>({
        value: 2,
        label: "اصفهان",
    });

    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const { data: provinces } = useGetProvinces();

    const { mutate, data, isLoading, isError } = useGetRatingByProvince();

    const provinceOnChange = (selectedOption: any) => {
        setProvinceSelect(selectedOption);
        const formData = {
            provinceId: selectedOption.label,
            fromDate: moment(setDateOneMonth().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
        };
        mutate(formData);
    };
    useEffect(() => {
        const formData = {
            fromDate: "0",
            toDate: "0",
            provinceId: "0",
        };

        mutate(formData);
        // eslint-disable-next-line
    }, []);

    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
            provinceId: provinceSelect.label,
        };
        mutate(formData);
    };

    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
            provinceId: provinceSelect.label,
        };
        mutate(formData);
    };


    return (
        <>
            <Card6 image="" title="گزارش آماری میزان نظرسنجی براساس نمایندگی">
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="py-1">
                            <label>استان</label>
                            <ProfessionalSelect
                                options={dropdownProvinces(provinces)}
                                onChange={provinceOnChange}
                                value={provinceSelect}
                                defaultValue={{
                                    value: 2,
                                    label: "اصفهان",
                                }}
                                placeholder=""
                            />
                        </div>
                        <div className="py-1 w-full">
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
                        </div>
                    </div>
                </div>
                <SplineTwoCharts
                    data={data?.map((item: {averageStars: number}) => item.averageStars)}
                    data1={data?.map((item: {customersCount: number}) => item.customersCount)}
                    categories={data?.map((item: {branchName: string}) => item.branchName)}
                    title1="میانگین ستاره های اخذ شده"
                    title2="تعداد شرکت کنندگان در نظرنسجی"
                    color="#A5978B"
                    color1="#d4526e"
                    isLoading={isLoading}
                    isError={isError}
                    tooltip={true}
                    text=""
                />
            </Card6>
        </>
    );
};

export default DealersRatingBasedOfProvinceReport;
