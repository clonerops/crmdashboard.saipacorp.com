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
    data3?: any;
    title1?: string;
    title2?: string;
    title3?: string;
    title4?: string;
    isLoading?: boolean;
    isError?: boolean;
}

const VerticalCategoryRequestOrComplaintCharts: FC<IProps> = ({
    text,
    categories,
    data,
    data1,
    data2,
    data3,
    title1,
    title2,
    title3,
    title4,
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
        credits: {
            enabled: false
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
                // name: "شکایت/درخواست",
                name: title1,
                data: data,
                // colors: ["#546E7A", "#d4526e", "#13d8aa", "#A5978B"],
                colors: ["#d4526e"],
                // pointWidth: 30, // Initial width of the bars
            },
            {
                name: title2,
                data: data1,
                // data: data1,
                colors: ["#546E7A"],
                // pointWidth: 30, // Initial width of the bars
            },
            {
                name: title3,
                data: data2,
                // data: data1,
                colors: ["#13d8aa"],
                // pointWidth: 30, // Initial width of the bars
            },
            {
                name: title4,
                data: data3,
                // data: data1,
                colors: ["#19g6aa"],
                // pointWidth: 30, // Initial width of the bars
            },
        ],
        plotOptions: {
            series: {
                colors: ["#585E7B", "#d4526e", "#13d8aa", "#A5978B"],
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
                if (this.series.name === title1) {
                    return `<b> ${this.x} <br /> ${title1}: ${this.y} </b>`;
                } else if (this.series.name === title2) {
                    return `<b> ${this.x} <br /> ${title2}: ${this.y} </b>`;
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

export { VerticalCategoryRequestOrComplaintCharts };
