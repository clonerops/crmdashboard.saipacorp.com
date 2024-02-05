import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import moment from "moment-jalaali";
import { useGetSurveryReport } from "../_core/_hooks";
import { setDateOneMonth } from "../../../../_cloner/helpers/reusableFunction";
import { HorizontalCharts } from "../../../../_cloner/partials/charts/HorizontalCharts";
import { SplineCharts } from "../../../../_cloner/partials/charts/SplineCharts";
import TopxReportModal from "./TopxReportModal";
import ServuryReportModal from "./SurveryReportModal";

const carGroupList= [
    {value: 71, label: "شاهین اتومات"},
    {value: 95, label: "چانگان"}
]


const SurveryReport = () => {
    const [carSelect, setCarSelect] = useState<any>({value: 71, label: "شاهین اتومات"});
    const [fromDate, setFromDate] = useState(setDateOneMonth().getTime());
    const [toDate, setToDate] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const {
        mutate,
        data: survery,
        isLoading,
        isError,
    } = useGetSurveryReport();

    useEffect(() => {
        const formData = {
            fromDate: moment(setDateOneMonth().getTime()).format(
                "jYYYY/jMM/jDD"
            ),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
            carGroupID: 71,
        };
        mutate(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
            carGroupID: carSelect?.value
        };
        mutate(formData);
    };
    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
            carGroupID: carSelect?.value
        };
        mutate(formData);
    };

    const onChangeCar = (selectOption: any) => {
        setCarSelect(selectOption)
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            carGroupID: selectOption?.value,
        };
        mutate(formData);
    };

    let filteredCountAll = survery?.filter((value: any) => value.question === 'CountAll')
    let filteredWithoutCountAll = survery?.filter((value: any) => value.question !== 'CountAll')

    return (
        <Card6 image="" title="گزارش ارزیابی خودروهای چانگان و شاهین اتومات - براساس میانگین امتیاز">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="py-1 w-full">
                        <CustomDatepicker
                            placeholder="از تاریخ"
                            onChange={(d: any) => fromDateChange(d)}
                            defaultValue={setDateOneMonth().getTime()}
                        />
                    </div>
                    <div className="py-1 w-full">
                        <CustomDatepicker
                            placeholder="تا تاریخ"
                            onChange={(d: any) => toDateChange(d)}
                            defaultValue={new Date().getTime()}
                        />
                    </div>
                    <div className="py-1 w-full">
                        <ProfessionalSelect
                            options={carGroupList}
                            onChange={onChangeCar}
                            value={carSelect}
                            placeholder=""
                        />
                    </div>
                    {/* <div className="py-1 w-full">
                        <button onClick={() => setIsOpen(true)} className="w-full">
                                مشاهده جزئیات
                        </button>
                    </div> */}
                </div>
                <div className="py-1 w-full flex justify-end font-bold text-xl">
                        تعداد کل شرکت کنندگان در نظرسنجی: {filteredCountAll?.length > 0 ? filteredCountAll[0]?.questionCount : 0}
                </div>
            </div>
            <VerticalCharts
                data={filteredWithoutCountAll?.map((item: any) => item.questionCount)}
                categories={filteredWithoutCountAll?.map((item: any) => item.question)}
                isLoading={isLoading}
                isError={isError}
                text=""
            />
            {/* <ServuryReportModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </Card6>
    );
};

export default SurveryReport;
