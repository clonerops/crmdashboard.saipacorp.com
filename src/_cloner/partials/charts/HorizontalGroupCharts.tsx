/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

HC_exporting(Highcharts);

interface IProps {
    text: string;
    categories?: any;
    data?: any;
    data1?: any;
    title1?: string;
    title2?: string;
    isLoading?: boolean;
    isError?: boolean;
}

const HorizontalGroupCharts: FC<IProps> = ({
    text,
    categories,
    data,
    data1,
    title1,
    title2,
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
            type: "bar",
        },
        title: {
            text: text,
        },
        xAxis: {
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
        series: [
            {
                // name: "شکایت/درخواست",
                name: title1,
                data: data,
                // colors: ["#546E7A", "#d4526e", "#13d8aa", "#A5978B"],
                colors: ["#A5978B"],
            },
            {
                name: title2,
                data: data1,
                // data: data1,
                colors: ["#13d8aa"],
            },
        ],
        fill: {
            opacity: 1,
        },
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
            enabled: false,
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

export { HorizontalGroupCharts };
