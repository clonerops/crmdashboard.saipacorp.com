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
    isLoading?: boolean;
    isError?: boolean;
}

const StackedComplaintOrRequestCharts: FC<IProps> = ({
    text,
    categories,
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

    const options = {
        chart: {
            type: "column",
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
            stackLabels: {
                enabled: true,
                style: {
                    fontSize: "16px",
                    fontFamily: "Yekan_reqular",
                },
                // formatter: function(this: any) {
                //     return this.total
                //   },
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
                name: "شکایت / درحال انجام",
                data: data?.map((item: any) => item.complaintDoingCount),
                color: "#546E7A",
                stack: 'group1', // Group for the first column
            },
            {
                name: "درخواست / درحال انجام",
                data: data?.map((item: any) => item.requestDoingCount),
                color: "#d4526e",
                stack: 'group2', // Group for the first column
            },
            {
                name: "شکایت / پایان یافته",
                data: data?.map((item: any) => item.complaintEndedCount),
                color: "#13d8aa",
                stack: 'group1', // Group for the first column
            },
            {
                name: "درخواست / پایان یافته",
                data: data?.map((item: any) => item.requestEndedCount),
                color: "#19g6aa",
                stack: 'group2', // Group for the first column
            },
        ],
        plotOptions: {
            series: {
                distributed: true,
                stacking: "normal", // Enable stacking
                column: {
                    groupPadding: 0.2, // Adjust the group padding
                    pointPadding: 0, // No padding between grouped columns
                }, // colorByPoint: true, // Enable color by point
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
        //     enabled: false,
        // },
        tooltip: {
            enabeld: true,
            formatter: function (
                this: Highcharts.TooltipFormatterContextObject
            ) {
                console.log("this.series.name", this.series.name)
                if (this.series.name === "شکایت / درحال انجام") {
                    return `<b> ${this.x} <br />شکایت / درحال انجام: ${this.y} </b>`;
                } else if (this.series.name === "درخواست / درحال انجام") {
                    return `<b> ${this.x} <br /> درخواست / درحال انجام: ${this.y} </b>`;
                }else if (this.series.name === "شکایت / پایان یافته") {
                    return `<b> ${this.x} <br /> شکایت / پایان یافته: ${this.y} </b>`;
                }else if (this.series.name === "درخواست / پایان یافته") {
                    return `<b> ${this.x} <br /> درخواست / پایان یافته: ${this.y} </b>`;
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

export { StackedComplaintOrRequestCharts };
