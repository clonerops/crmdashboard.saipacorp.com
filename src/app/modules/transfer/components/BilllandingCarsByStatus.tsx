import { useEffect, useState } from "react";
import { Card6 } from "../../../../_cloner/partials/content/cards/Card6";
import ProfessionalSelect from "../../esale/components/ProfessionalSelect";
import {
    useGetBLandsCarsByStatus,
    useGetContractors,
    useGetDealers,
} from "../core/_hooks";
import {
    dropdownContractors,
    dropdownDealers,
} from "../helpers/dropdownTransfer";
import { VerticalCharts } from "../../../../_cloner/partials/charts/VerticalCharts";

const BilllandingCarsByStatus = () => {
    const [selectedContractors, setSelectedContractors] = useState({
        value: 0,
        label: "همه",
    });
    const [selectedDealers, setSelectedDealers] = useState({
        value: 0,
        label: "همه",
    });

    const { data: contractors } = useGetContractors();
    const { data: dealers } = useGetDealers();
    const {
        mutate,
        data: BlandStatus,
        isLoading,
        isError,
    } = useGetBLandsCarsByStatus();

    useEffect(() => {
        const formData = {
            fromDate: "",
            toDate: "",
            contractor_id: 0,
            dealer_no: 0,
        };
        mutate(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeContractors = (selectedOption: any) => {
        setSelectedContractors(selectedOption);
        const formData = {
            fromDate: "",
            toDate: "",
            contractor_id: selectedOption?.value,
            dealer_no: selectedDealers?.value,
        };
        mutate(formData);
    };
    const onChangeDealers = (selectedOption: any) => {
        setSelectedDealers(selectedOption);
        const formData = {
            fromDate: "",
            toDate: "",
            contractor_id: selectedContractors?.value,
            dealer_no: selectedOption?.value,
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
                    <div className="py-1 w-full">
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
                            onChange={onChangeDealers}
                            value={selectedDealers}
                            placeholder="نمایندگی"
                        />
                    </div>
                </div>
            </div>
            <VerticalCharts
                data={BlandStatus?.map((item: any) => item.count)}
                categories={BlandStatus?.map((item: any) => item.statusDesc)}
                isLoading={isLoading}
                isError={isError}
                text=""
            />
        </Card6>
    );
};

export default BilllandingCarsByStatus;
