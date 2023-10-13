import React, { useState, useEffect } from "react";
import styles from "./Chart.module.scss";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from "chart.js";
import { useQuery } from "react-query";
import Loader from "@/app/ui/Loader/Loader";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
);

const fetchCoins = (id: any, choice: any) => {
    return fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=${choice}`
    ).then((res) => {
        const result = res.json();

        return result;
    });
};

const MyChart = ({ id }: any) => {
    const { data, isLoading, isSuccess, isError, refetch } = useQuery(
        ["history"],
        () => fetchCoins(id, choiceDate),
        {
            keepPreviousData: true,
        }
    );

    const [chartData, setChartData] = useState([]);
    const [filterData, setFilterData] = useState<any>({});
    const [choiceDate, setChoiceDate] = useState("m1");
    useEffect(() => {
        refetch(); // Перезапускаем запрос с новым значением choiceDate
    }, [choiceDate]);
    useEffect(() => {
        if (isSuccess) {
            setChartData(data.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (chartData.length > 0) {
            setFilterData({
                labels: chartData.map((data: any) => {
                    const date = new Date(data.date);
                    return date.toLocaleDateString();
                }),
                datasets: [
                    {
                        label: id.toUpperCase(),
                        data: chartData.map((data: any) => data.priceUsd),
                    },
                ],
            });
        }
    }, [chartData]);

    const options: any = {
        plugins: {
            legend: true,
            tooltips: {
                enabled: true,
                intersect: false,
            },
        },
        scales: {
            y: {},
        },
        pointBackgroundColor: "white",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
    };

    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        console.log("error");
    }

    return (
        <div className={styles.chart}>
            {Object.keys(filterData).length > 0 ? (
                <>
                    <Line data={filterData} options={options} />
                    <div className={styles.radio}>
                        <label>
                            <input
                                type="radio"
                                name="chartRadio"
                                value="m1"
                                onClick={(e: any) =>
                                    setChoiceDate(e.target.value)
                                }
                            />
                            Day
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="chartRadio"
                                value="m15"
                                onClick={(e: any) =>
                                    setChoiceDate(e.target.value)
                                }
                            />
                            Week
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="chartRadio"
                                value="h1"
                                onClick={(e: any) =>
                                    setChoiceDate(e.target.value)
                                }
                            />
                            Month
                        </label>
                    </div>
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};
export default MyChart;
