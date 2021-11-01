import Card from "./card.component";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export const LineChartDiagram: React.FunctionComponent<{ sequence: { t: number, value: number }[], delta: number }> = ({ sequence, delta }) => {

    return (
        <Card title="Line chard">
            <LineChart
                width={800}
                height={400}
                data={sequence}>
                    <XAxis dataKey="t" />
                    <YAxis dataKey="value" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Line type="monotone" 
                        dataKey="value" 
                        stroke="#ff7300" 
                        yAxisId={0} />
            </LineChart>
        </Card>
    );
};