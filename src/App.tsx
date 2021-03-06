import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ApplicationHeader } from './components/application-header.component';
import { LineChartDiagram } from './components/line-chart.component';
import { CircleDiagram } from './components/circle-diagram.component';
import { SpectralAnalyzeDiagram } from './components/spectral-analyze-diagram';
import { GetMultSin } from './services/math.service';
import { SignalMixer } from './components/signal-mixer.component';
import { useState } from 'react';

export const App: React.FunctionComponent = () => {

  // logic

  const [deltaT, setDeltaT] = useState(0);

  const [sequence, setSequence] = useState<{ t: number, value: number }[]>([]);

  // data for circle
  const [centerOfMass, setCenterOfMass] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [circleDiagramCoordinates, setCircleDiagramCoordinates] = useState<{ x: number, y: number }[]>([])
  const [maxA, setMaxA] = useState(0);

  const getDataByMixer = (signals: { aMax: number, freq: number }[], durationBySecond: number, deltaTBySecond: number, deltaA: number) => {
    setDeltaT(deltaTBySecond);

    const seqs = GetMultSin(
      signals,
      deltaTBySecond,
      durationBySecond,
      deltaA);

    setSequence(seqs);
  };

  const updateCircleDiagramHandler = (coords: { x: number, y: number }[], cntrOfMass: { radius: number, x: number, y: number }) => {
    setCenterOfMass(prevVal => (cntrOfMass));
    setCircleDiagramCoordinates(prevVal => (coords));
    setMaxA(prevVal => (cntrOfMass.radius))
  };


  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <ApplicationHeader />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <SignalMixer 
            updateSignals={getDataByMixer} />
        </div>
        <div className="col-md-8">
          <LineChartDiagram 
            sequence={sequence} 
            delta={deltaT} />
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-md-4">
          <CircleDiagram 
            coordinates={circleDiagramCoordinates} 
            centerOfMass={centerOfMass}
            a={maxA} />
        </div>
        <div className="col-md-8">
          <SpectralAnalyzeDiagram 
            sequence={sequence} 
            updateCollback={updateCircleDiagramHandler} />
        </div>
      </div>

    </div>
  );
};
