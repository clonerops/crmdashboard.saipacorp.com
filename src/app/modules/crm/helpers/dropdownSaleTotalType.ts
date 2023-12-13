export const dropdownQuestionSurvery = (data: any) => {
    return (
        data &&
        data?.map((obj: { qustionNo: any; question: any }): any => {
            const { qustionNo, question } = obj;
            return { value: qustionNo, label: question };
        })
    );
};
export const dropdownCarType = (data: any) => {
    return (
        data &&
        data?.map((obj: { typeID: any; typeName: any }): any => {
            const { typeID, typeName } = obj;
            return { value: typeID, label: typeName };
        })
    );
};
