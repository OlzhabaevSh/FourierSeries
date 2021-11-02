import { useState } from "react";

export const SignalMixer: React.FunctionComponent<{updateSignals : (signals: { aMax: number, freq: number }[], durationBySecond: number, deltaTBySecond: number, deltaA: number ) => void}> = ({updateSignals}) => {
    

    const [durationBySecond, setDurationBySecond] = useState(1);
    const [deltaTBySecond, setDeltaTBySecond] = useState(0.02);

    const [deltaA, setDeltaA] = useState(10);
    

    const [aMax, setAMax] = useState(1);
    const [freq, setFreq] = useState(1);

    const [signals, setSignals] = useState<{ aMax: number, freq: number }[]>([]);

    const AddSignal = () => {
        console.info("signal added");

        setSignals([...signals, { aMax: aMax, freq: freq }]);

        setAMax(1);
        setFreq(1);
    };

    const Calculate = () => {
        updateSignals(
            signals,
            durationBySecond,
            deltaTBySecond,
            deltaA);
    };

    return (
        <div className="card">
            <div className="card-header">
                Signal Mixer
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <div className="md-3">
                            <label className="form-label">Duration by seconds</label>
                            <input 
                                className="form-control"
                                type="number"
                                value={durationBySecond}
                                onChange={e => setDurationBySecond(parseFloat(e.target.value??"1"))} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="md-3">
                            <label className="form-label">delta t by seconds</label>
                            <input 
                                className="form-control"
                                type="number"
                                value={deltaTBySecond}
                                onChange={e => setDeltaTBySecond(parseFloat(e.target.value??"1"))} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="md-3">
                            <label className="form-label">delta A plus</label>
                            <input 
                                className="form-control"
                                type="number"
                                value={deltaA}
                                onChange={e => setDeltaA(parseFloat(e.target.value??"1"))} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="md-3">
                            <label className="form-label">A Max(t)</label>
                            <input 
                                className="form-control"
                                type="number"
                                value={aMax}
                                onChange={e => setAMax(parseFloat(e.target.value??"1"))} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="md-3">
                            <label className="form-label">Frequence</label>
                            <input 
                                className="form-control"
                                type="number"
                                value={freq}
                                onChange={e => setFreq(parseFloat(e.target.value??"1"))} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <button 
                            className="btn btn-primary"
                            style={{ margin: 30  }}
                            onClick={AddSignal}>Add signal</button>
                    </div>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>A_max(t)</th>
                            <th>f</th>
                            <th>func</th>
                        </tr>
                    </thead>
                    <tbody>
                        {signals.map((m, i) => <tr key={i}>
                            <td>{i}</td>
                            <td>{m.aMax}</td>
                            <td>{m.freq}</td>
                            <td>{m.aMax} * cos({m.freq} * t)</td>
                            </tr>)}
                    </tbody>
                </table>

                <button className="btn btn-primary"
                    onClick={Calculate}>
                    Calculate
                </button>

            </div>
            
        </div>
    );
}