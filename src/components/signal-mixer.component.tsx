import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import { useState } from "react";
import Card from "./card.component";

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

    return (<div>
        <Card title="Signal Mixer">
            <Stack>
                <TextField label="Duration by seconds" 
                    type="number" 
                    onChange={(e, v) => setDurationBySecond(parseFloat(v??"0"))}
                    defaultValue={durationBySecond.toString()} />

                <br />

                <TextField label="delta t by seconds" 
                    type="number" 
                    onChange={(e, v) => setDeltaTBySecond(parseFloat(v??"0"))} 
                    defaultValue={deltaTBySecond.toString()}/>

                <br />

                <TextField label="delta A plus" 
                    type="number" 
                    onChange={(e, v) => setDeltaA(parseFloat(v??"0"))} 
                    defaultValue={deltaA.toString()}/>
                
                <hr />

                <TextField label="A Max(t)" 
                    type="number" 
                    onChange={(e, v) => setAMax(parseFloat(v??"0"))} 
                    defaultValue={aMax.toString()}/>
                
                <br />

                <TextField label="Frequence" 
                    type="number" 
                    onChange={(e, v) => setFreq(parseInt(v??"0"))} 
                    defaultValue={freq.toString()}/>
                
                <br />

                <PrimaryButton text="Add signal" onClick={AddSignal} />

                <hr />

                {signals.map((m, i) => <div key={i}>{i}. {m.aMax} * cos({m.freq} * t)</div>)}

                <hr />

                <PrimaryButton text="Calculate" onClick={Calculate} />

            </Stack>
        </Card>
    </div>);
}