import React, { useState } from 'react';
import { Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { ApplicationHeader } from './components/application-header.component';
import { InputForm } from './components/inpit-form.component';
import { LineChartDiagram } from './components/line-chart.component';
import { CircleDiagram } from './components/circle-diagram.component';
import { SpectralAnalyzeDiagram } from './components/spectral-analyze-diagram';
import { GetMultSin } from './services/math.service';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

export const App: React.FunctionComponent = () => {
  //var [count, setCount] = useState(1)
  //setInterval(() => { setCount(++count) }, 1000)

  const delta = 0.004;
  const duration = 4.5;

    const sequence = GetMultSin(
        [
            { aMax: 2, freq: 4 }, 
            { aMax: 5, freq: 12 },
        ],
        delta,
        duration,
        10
    );

  return (
    <Stack>
      <Stack.Item grow>
        <ApplicationHeader />
      </Stack.Item>
      
      <Stack.Item grow>
        <Stack horizontal>
          <Stack.Item grow={1}>
            <InputForm delta={delta} series={sequence.map(f => f.value)} />
          </Stack.Item>
          <Stack.Item grow={3}>
            <LineChartDiagram sequence={sequence} delta={delta} />
          </Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item grow>
        <Stack horizontal>
          <Stack.Item grow={1}>
            <CircleDiagram sequence={sequence} freq={13} />
          </Stack.Item>

          <Stack.Item grow={3}>
            <SpectralAnalyzeDiagram sequence={sequence} />
          </Stack.Item>
          
        </Stack>  
      </Stack.Item>

    </Stack>
  );
};
