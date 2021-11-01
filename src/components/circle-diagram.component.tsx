import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import Card from "./card.component";

export const CircleDiagram: React.FunctionComponent <{ coordinates: { x: number, y: number }[], centerOfMass: { x: number, y: number }, a: number }> = ({ coordinates, centerOfMass, a }) => {

    let [ maxX, 
        minX, 
        maxY, 
        minY ] =  [-1, 1, -1, 1];

    coordinates.forEach(item => {
        if(item.x > maxX)
            maxX = item.x;
        
        if(item.x < minX)
            minX = item.x;

        if(item.y > maxY)
            maxY = item.y;

        if(item.y < minY)
            minY = item.y;
    });

    return (
        <Card title="Circle diagram">
            <div>
                <p>Center: {a} | {centerOfMass.x} {centerOfMass.y}</p>
                <ScatterChart 
                    width={400}
                    height={400}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <XAxis type="number" dataKey="x" range={[minX, maxX]} />
                        <YAxis type="number" dataKey="y" range={[minY, maxY]} />
                        <Scatter 
                            name="Rads" 
                            data={coordinates} 
                            fill="#8884d8" />
                </ScatterChart>
            </div>
        </Card>
    );
};