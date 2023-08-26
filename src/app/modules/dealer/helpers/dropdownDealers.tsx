export const dropdownDealers = (data: any) => {
    return (
        data &&
        data?.map((obj: { dlR_NO: any; dlR_NAME: any }): any => {
            const { dlR_NO, dlR_NAME } = obj;
            return { value: dlR_NO, label: dlR_NAME };
        })
    );
};