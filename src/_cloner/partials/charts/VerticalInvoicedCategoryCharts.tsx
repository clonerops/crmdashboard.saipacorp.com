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
    data1?: any;
    data2?: any;
    isLoading?: boolean;
    isError?: boolean;
}

const VerticalInvoicedCategoryCharts: FC<IProps> = ({
    text,
    categories,
    data,
    data1,
    data2,
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
        credits: {
            enabled: false
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
                name: "فاکتور شده ها",
                data: data,
                colors: ["#546E7A", "#d4526e", "#13d8aa", "#A5978B"],
            },
            {
                name: "تحویل شده ها",
                data: data1,
                // data: data1,
                colors: ["#d4526e"],
            },
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
                if (this.series.name === "فاکتور شده ها") {
                    return `<b> ${this.x} <br /> فاکتور شده ها: ${this.y} </b>`;
                } else if (this.series.name === "تحویل شده ها") {
                    return `<b> ${this.x} <br /> تحویل شده ها: ${this.y} </b>`;
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

export { VerticalInvoicedCategoryCharts };
