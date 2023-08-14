/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

interface IProps {
    text: string;
    categories?: any;
    data?: any;
    detail?: any
    isLoading?: boolean;
    isError?: boolean;
}

const VerticalCategoryCrmStatusComplaintOrRequestCharts: FC<IProps> = ({
    text,
    categories,
    data,
    detail,
    isLoading,
    isError,
}) => {
    if (isLoading) {
        return <div>درحال بارگزاری...</div>;
    }

    if (isError) {
        return <div>داده ای برای نمایش یافت نشد</div>;
    }
    
    const options = {
        chart: {
            type: "column",
        },
        title: {
            text: text,
        },
        xAxis: {
            type: "category",
            categories: categories,
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
                name: "وضعیت",
                data: data,
                colors: ["#546E7A", "#d4526e", "#13d8aa", "#A5978B"],
            },
            // {
            //     name: "تعداد مختومگی",
            //     data: data1,
            //     // data: data1,
            //     colors: ["#546E7A"],
            // },
        ],
        plotOptions: {
            series: {
                colors: ["#546E7A", "#d4526e", "#13d8aa", "#A5978B"],
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
        tooltip: {
            enabeld: true,
            formatter: function (
                this: Highcharts.TooltipFormatterContextObject
            ) {
                if (this.series.name === "وضعیت") {
                    return `<b> ${this.x} <br /> وضعیت: ${this.y} </b>`;
                } else if (this.series.name === "تعداد مختومگی") {
                    return `<b> ${this.x} <br /> تعداد مختومگی: ${this.y} </b>`;
                }
            },
        },
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

export { VerticalCategoryCrmStatusComplaintOrRequestCharts };
