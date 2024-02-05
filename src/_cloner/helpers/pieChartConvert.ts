export const pieChartConvert = (data: any) => {
    return (
        data &&
        data?.map((obj: { count: any; statusDesc: any }): any => {
            const { count, statusDesc } = obj;
            return { y: count, name: statusDesc };
        })
    );
};
export const pieChartCarEvaluationConvert = (data: any) => {
    return (
        data &&
        data?.map((obj: { count: any; title: any }): any => {
            const { count, title } = obj;
            return { y: count, name: title };
        })
    );
};