import { toPersianCharacter } from "../../../../_cloner/helpers/toCharacterConvert";

export const dropdownDealers = (data: any) => {
    return (
        data &&
        data?.map((obj: { dlR_NO: any; dlR_NAME: any }): any => {
            const { dlR_NO, dlR_NAME } = obj;
            return { value: dlR_NO, label: toPersianCharacter(dlR_NAME + dlR_NO) };
        })
    );
};
export const dropdownProvinces = (data: any) => {
    return (
        data &&
        data?.filter((item: {prvN_NO: number}) => item.prvN_NO !== 0).map((obj: { prvN_NO: any; prvN_NAME: any }): any => {
            const { prvN_NO, prvN_NAME } = obj;
            return { value: prvN_NO, label: prvN_NAME };
        })
    );
};