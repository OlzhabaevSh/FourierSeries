import Chart from "chart.js";
import { useEffect, useRef } from "react";
import { CalculateMassesCenter, ConvertToVector, ConvertVectorsToCoordinates, GetMultSin } from "../services/math.service";
import Card from "./card.component";

interface Props {
    chartData: { x: number, y: number }[];
}

const CircleChart = ({ chartData }: Props) => {
    // helper function to format chart data since you do this twice
    const formatData = (data: { x: number, y: number }[]): Chart.ChartData => ({
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
                type: "scatter",
                data: formatData(chartData),
                options: { 
                    responsive: true,
                    tooltips: {
                        enabled: false
                    }
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

export const CircleDiagram: React.FunctionComponent <{ sequence: { t: number, value: number }[], freq: number }> = ({ sequence, freq }) => {

    const vectors = ConvertToVector(sequence, freq);

    const data = ConvertVectorsToCoordinates(vectors);

    const centerOfMass = CalculateMassesCenter(data);

    return (
        <Card title="Circle diagram">
            <div>
                <p>Sum: {centerOfMass}</p>
                <CircleChart chartData={data} />
            </div>
        </Card>
    );
};