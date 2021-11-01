import Chart from "chart.js";
import { useEffect, useRef } from "react";
import { CalculateMassesCenter, ConvertToVector, ConvertVectorsToCoordinates, GetMultSin } from "../services/math.service";
import Card from "./card.component";

interface Props {
    delta: number,
    chartData: number[];
}

const BarChart = ({ chartData, delta }: Props) => {
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
                type: "bar",
                data: formatData(chartData),
                options: { responsive: true }
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

export const SpectralAnalyzeDiagram: React.FunctionComponent<{ sequence: { t: number, value: number }[] }> = ({ sequence }) => {

    var cachedData = new Array(15).fill(0).map((m, i) => i + 1);

    var d : { freq: number, val: number, countOfMathcing: number }[] = [];

    cachedData.forEach(item => {
        const vectors = ConvertToVector(sequence, item);

        const data = ConvertVectorsToCoordinates(vectors);

        var matchingDict: { [name: string]: number } = {};
        var matchingCount = 0;

        data.forEach(item => {
            if(matchingDict[item.x + '_' + item.y] == undefined){
                matchingDict[item.x + '_' + item.y] = 0;
            } else {
                matchingDict[item.x + '_' + item.y]++;
                matchingCount++;
            }
        });

        const centerOfMass = CalculateMassesCenter(data);

        d.push({ freq: item, val: centerOfMass, countOfMathcing: matchingCount });
    });

    var data = d.map(f => f.val);

    return (
        <Card title="Spectral analize">
            <BarChart chartData={data} delta={1} />
        </Card>
    );
};