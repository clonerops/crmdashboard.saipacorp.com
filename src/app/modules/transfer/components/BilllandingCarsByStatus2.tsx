import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import { useGetBLandsCarsByStatus2, useGetContractors } from "../core/_hooks";
import { dropdownContractors } from "../helpers/dropdownTransfer";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";
import CustomDatepicker from "../../../../_cloner/helpers/components/CustomDatepicker";
import moment from "moment-jalaali";

const BilllandingCarsByStatus2 = () => {
    const [selectedContractors, setSelectedContractors] = useState({
        value: 0,
        label: "همه",
    });
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    let calculateFromDate = moment(fromDate).format("jYYYY/jMM/jDD");
    let calculateToDate = moment(toDate).format("jYYYY/jMM/jDD");
    let calculateNowDate = moment(Date.now()).format("jYYYY/jMM/jDD");

    const { data: contractors } = useGetContractors();
    const {
        mutate,
        data: BlandStatus2,
        isLoading,
        isError,
    } = useGetBLandsCarsByStatus2();

    useEffect(() => {
        const formData = {
            fromDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
            toDate: moment(Date.now()).format("jYYYY/jMM/jDD"),
            contractor_id: 0,
            dealer_no: 0,
        };
        mutate(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeContractors = (selectedOption: any) => {
        setSelectedContractors(selectedOption);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: toDate ? calculateToDate : calculateNowDate,
            contractor_id: selectedOption?.value,
            dealer_no: 0,
        };
        mutate(formData);
    };
    const fromDateChange = (d: any) => {
        setFromDate(d.value);
        const formData = {
            fromDate: moment(d.value).format("jYYYY/jMM/jDD"),
            toDate: toDate ? calculateToDate : calculateNowDate,
            contractor_id: selectedContractors?.value,
            dealer_no: 0,
        };
        mutate(formData);
    };
    const toDateChange = (d: any) => {
        setToDate(d);
        const formData = {
            fromDate: fromDate ? calculateFromDate : calculateNowDate,
            toDate: moment(d.value).format("jYYYY/jMM/jDD"),
            contractor_id: selectedContractors?.value,
            dealer_no: 0,
        };
        mutate(formData);
    };

    return (
        <Card6 image="" title="گزارش آماری خودروها">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="py-1 w-full">
                        <label>پیمانکار</label>
                        <ProfessionalSelect
                            options={dropdownContractors(contractors?.result)}
                            onChange={onChangeContractors}
                            value={selectedContractors}
                            placeholder="پیمانکار حمل"
                        />
                    </div>
                   
                </div>
                <div className="flex flex-row gap-4">
                    <div className="py-1 w-full">
                        <CustomDatepicker
                            placeholder="از تاریخ"
                            onChange={(d: any) => fromDateChange(d)}
                            defaultValue={new Date().getTime()}
                        />
                    </div>
                    <div className="py-1 w-full">
                        <CustomDatepicker
                            placeholder="تا تاریخ"
                            onChange={(d: any) => toDateChange(d)}
                            defaultValue={new Date().getTime()}
                        />
                    </div>
                </div>
            </div>
            <VerticalCharts
                data={BlandStatus2?.map((item: any) => item.count)}
                categories={BlandStatus2?.map((item: any) => item.statusDesc)}
                isLoading={isLoading}
                isError={isError}
                text=""
            />
        </Card6>
    );
};

export default BilllandingCarsByStatus2;
