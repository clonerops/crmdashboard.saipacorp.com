/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import { IDealerQuestion } from "../core/_models";
HC_exporting(Highcharts);

interface IProps {
    text: string;
    data?: IDealerQuestion;
    isLoading?: boolean;
    isError?: boolean;
}

const VerticalCategoryDealerQuestionCharts: FC<IProps> = ({
    text,
    data,
    isLoading,
    isError,
}) => {
    if (isLoading) {
        return <div>درحال بارگزاری...</div>;
    }

    if (isError) {
        return <div>داده ای برای نمایش یافت نشد</div>;
    }

    const weaknessesData = [
        {
            name: "رفتار نامناسب نماینده و كاركنان",
            y: data?.weaknessInappropriateTreatment,
        },
        { name: "عدم تمیزی خودرو", y: data?.weaknessCarNotClean },
        {
            name: "ظاهر غیرآراسته و نامرتب پرسنل",
            y: data?.weaknessPersonelNoCleaning,
        },
        { name: "درخواست یا دريافت وجه اضافی", y: data?.weaknessGetExtraMoney },
        {
            name: "عدم تمیزی عدم نظافت و آراستگی فضای قسمت فروش خودرو",
            y: data?.weaknessSaleNoCleaning,
        },
        {
            name: "عدم نظافت و آراستگی فضای قسمت تحویل خودرو",
            y: data?.weaknessDeliveryNoCleaning,
        },
        { name: "تحویل خودرو بدون رفع ایراد", y: data?.weaknessNotFixProblem },
        {
            name: "عدم آموزش مناسب استفاده از خودرو و آپشن‌های آن",
            y: data?.weaknessInadequateTraining,
        },
    ];

    const strengthData = [
        {
            name: "رفتار محترمانه نماینده و كاركنان",
            y: data?.strengthAppropriateTreatment,
        },
        { name: "تميزی خودرو", y: data?.strengthCarWasClean },
        { name: "ظاهر آراسته و مرتب پرسنل", y: data?.strengthPersonelWasClean },
        { name: "پذيرايی مناسب", y: data?.strengthProperReception },
        {
            name: "نظافت و آراستگی فضای قسمت فروش خودرو",
            y: data?.strengthExistCleaningInSale,
        },
        {
            name: "نظافت و آراستگی فضای قسمت تحویل خودرو",
            y: data?.strengthExistCleaningInDelivery,
        },
        {
            name: "عدم تمیزی تحویل خودرو بدون ایراد",
            y: data?.strengthNotProblem,
        },
        {
            name: "آموزش استفاده از خودرو و آپشن‌های آن",
            y: data?.strengthProperTraining,
        },
    ];
    const dataCategories = [
        {
            name: "رفتار پرسنل",
        },
        { name: "تمیزی خودرو" },
        {
            name: "آراستگی پرسنل",
        },
        {
            name: "درخواست وجه اضافی / پذیرایی",
        },
        {
            name: "تمیزی قسمت فروش خودرو",
        },
        {
            name: "تمیزی قسمت تحویل خودرو",
        },
        { name: "تحویل خودرو بدون رفع ایراد" },
        {
            name: "آموزش مناسب استفاده از خودرو و آپشن ها",
        },
    ];

    const options = {
        chart: {
            type: "column",
        },
        title: {
            text: text,
        },
        xAxis: {
            type: "category",
            categories: dataCategories.map((item) => item.name),
            labels: {
                style: {
                    fontFamily: "Yekan_reqular",
                },
            },
        },
        yAxis: {
            title: {
                text: "",
            },
            labels: {
                style: {
                    fontFamily: "Yekan_reqular",
                },
            },
        },
        fill: {
            opacity: 1,
        },
        series: [
            {
                name: "موارد مثبت ",
                data: strengthData,
                colors: ["#13d8aa"],
            },
            {
                name: "موارد منفی ",
                data: weaknessesData,
                colors: ["#d4526e"],
            },
        ],
        plotOptions: {
            series: {
                // colors: ["#585E7B", "#d4526e", "#13d8aa", "#A5978B"],
                distributed: true,
                colorByPoint: true, // Enable color by point
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "14px",
                        fontFamily: "Yekan_reqular",
                    },
                },
            },
        },
        exporting: {
            enabled: true, // enable exporting
            buttons: {
                contextButton: {
                    menuItems: [
                        "downloadPNG", // enable PNG download
                        "downloadJPEG", // enable JPEG download
                        "downloadPDF", // enable PDF download
                        "downloadSVG", // enable SVG download
                    ],
                },
            },
        },
        // tooltip: {
        //     enabeld: true,
        //     formatter: function (
        //         this: Highcharts.TooltipFormatterContextObject
        //     ) {
        //         if (this.series.name === title1) {
        //             return `<b> ${this.x} <br /> ${title1}: ${this.y} </b>`;
        //         } else if (this.series.name === title2) {
        //             return `<b> ${this.x} <br /> ${title2}: ${this.y} </b>`;
        //         }
        //     },
        // },
    };

    return (
        <>
            <HighchartsReact
                allowChartUpdate={true}
                highcharts={Highcharts}
                options={options}
            />
        </>
    );
};

export { VerticalCategoryDealerQuestionCharts };
