/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

interface IProps {
    text: string;
    title1: string;
    title2: string;
    color: string;
    color1: string;
    categories?: any;
    data?: any;
    data1?: any;
    isLoading?: boolean;
    isError?: boolean;
    tooltip?: boolean;
}

const SplineTwoCharts: FC<IProps> = ({
    text,
    title1,
    title2,
    color,
    color1,
    categories,
    data,
    data1,
    isLoading,
    isError,
    tooltip = false,
}) => {
    if (isLoading) {
        return <div>درحال بارگزاری...</div>;
    }

    if (isError) {
        return <div>داده ای برای نمایش یافت نشد</div>;
    }

    const options = {
        chart: {
            type: "spline",
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
        fill: {
            opacity: 1,
        },
        series: [
            {
                name: title1,
                data: data,
                lineWidth: 8, // Set the line width here
                // color: "#13d8aa", // Set line color for series 1
                color: color, // Set line color for series 1
            },
            {
                name: title2,
                data: data1,
                lineWidth: 8, // Set the line width here
                color: color1, // Set line color for series 2
            },
        ],
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: "#666666",
                    lineWidth: 1,
                },
            },
            series: {
                colors: ["#546E7A", "#d4526e", "#13d8aa", "#A5978B"],
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "14px",
                        fontFamily: "Yekan_reqular",
                    },
                },
            },
        },
        tooltip: {
            enabled: tooltip,
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

export { SplineTwoCharts };
