import { useState } from "react";
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { CalculateMassesCenter, ConvertToVector, ConvertVectorsToCoordinates } from "../services/math.service";

export type SpectralAnalyzeDiagramParams = {
    sequence: { t: number, value: number }[],
    updateCollback: (coords: { x: number, y: number }[], cntrOfMass: { radius: number, x: number, y: number }) => void
}

export const SpectralAnalyzeDiagram: React.FunctionComponent<SpectralAnalyzeDiagramParams> = ({ sequence, updateCollback }) => {

    const [fMax, setFMax] = useState(10);
    const [deltaF, setdeltaF] = useState(1);
    const [spectralData, setSpectralData] = useState<{f: number, a: number}[]>([]);

    const wait = (timeout: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

    const StartCaclulating = async () => {
        
        setSpectralData([]);

        let freqs: number[] = [];
        for(let i = 0; i <= fMax + 2; i+= deltaF) {
            freqs.push(i);
        }

        for await (const freq of freqs) {
            // calculate
            // throw event

            const vectors = ConvertToVector(sequence, freq);

            const data = ConvertVectorsToCoordinates(vectors);

            const centerOfMass = CalculateMassesCenter(data);

            setSpectralData(prevVal => 
                ([...prevVal, { f: freq, a: centerOfMass.radius }]));
            
            // throw event
            updateCollback(data, centerOfMass);

            await wait(200);
        }
    }

    const itemSelected = (e: { f: number, a: number }, index: number) => {
        let freq = e.f;

        const vectors = ConvertToVector(sequence, freq);

        const data = ConvertVectorsToCoordinates(vectors);

        const centerOfMass = CalculateMassesCenter(data);

        console.table(data);

        updateCollback(data, centerOfMass);
    
    
    };

    return (
        <div className="card">
            <div className="card-header">
                Spectral analize
            </div>
            <div className="card-body">
                <div className="row">

                    <div className="col-md-8">
                        <ScatterChart
                            width={800}
                            height={450}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <XAxis dataKey="f" />
                                <YAxis dataKey="a" />
                                <Scatter 
                                    name="Spectral analyze" 
                                    data={spectralData}
                                    onClick={itemSelected} 
                                    fill="#8884d8" />
                        </ScatterChart>
                    </div>

                    <div className="col-md-4">
                        <div className="mb-3">
                            <label className="form-label">Max F</label>
                            <input 
                                className="form-control"
                                type="number" 
                                value={fMax.toString()} 
                                onChange={e => setFMax(parseInt(e.target.value??"1"))} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">delta f</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                value={deltaF.toString()} 
                                onChange={e => setdeltaF(parseFloat(e.target.value??"1"))} />
                        </div>
                        <button 
                            className="btn btn-primary"
                            style={{ margin: 30  }}
                            onClick={StartCaclulating}>Start calulcating</button>
                    </div>
                </div>

                

            </div>
        </div>
    );
};