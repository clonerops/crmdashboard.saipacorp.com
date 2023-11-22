export const dropdownQuestionSurvery = (data: any) => {
    return (
        data &&
        data?.map((obj: { qustionNo: any; question: any }): any => {
            const { qustionNo, question } = obj;
            return { value: qustionNo, label: question };
        })
    );
};
