import Card from "./card.component";
import Chart from "chart.js";
import { useEffect, useRef } from "react";
import { ConvertToVector, GetMultSin } from "../services/math.service";

interface Props {
    delta: number,
    chartData: number[];
}

const LineChart = ({ chartData, delta }: Props) => {
    // helper function to format chart data since you do this twice
    const formatData = (data: number[]): Chart.ChartData => ({
        labels: data.map((cur, i) => (i + 1) * delta),
        datasets: [{ data }]
    });

    // use a ref to store the chart instance since it it mutable
    const chartRef = useRef<Chart | null>(null);

    // callback creates the chart on the canvas element
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            chartRef.current = new Chart(ctx, {
                type: "line",
                data: formatData(chartData),
                options: { 
                    responsive: true,
                    tooltips: {
                        enabled: false
                    },
                },
            });
        }
    };

    // effect to update the chart when props are updated
    useEffect(() => {
        // must verify that the chart exists
        if (chartRef.current) {
            chartRef.current.data = formatData(chartData);
            chartRef.current.update();
        }

        // cleanup function - I had to remove this as it was causing errors
        /*return () => {
          chartRef.current?.destroy();
        };*/
    }, [chartData]);

    return (
        <div className="self-center w-1/2">
            <div className="overflow-hidden">
                <canvas ref={canvasCallback}></canvas>
            </div>
        </div>
    );
}

export const LineChartDiagram: React.FunctionComponent<{ sequence: { t: number, value: number }[], delta: number }> = ({ sequence, delta }) => {

    const data = sequence.map(v => v.value);

    return (
        <Card title="Line chard">
            <LineChart chartData={data} delta={delta} />
        </Card>
    );
};