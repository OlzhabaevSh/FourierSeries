export function SumXandB(x: number, y: number): number {
    return x + y;
}

var cachedResult : { t: number, value: number }[] = [];

export function GetMultSin(
    freqs: { aMax: number, freq: number }[],
    deltaTimeBySecond: number = 0.01, 
    durationBySecond: number = 1,
    addingByA: number = 0) 
    : { t: number, value: number }[] {
        
        let result : { t: number, value: number }[] = [];

        for(let t = 0; t < durationBySecond; t += deltaTimeBySecond){
            let y = 0;
            freqs.forEach(freq => {
                let T = 1 / freq.freq;
                let freqVal = addingByA + freq.aMax * Math.cos(((2 * Math.PI) / T) * t);
                y += freqVal;
            });

            result.push({
                t: t,
                value: y
            });
        }

        return result;
    }

export function ConvertToVector(
    sequence: { t: number, value: number }[],
    freq: number)
    : { value: number, angle: number }[] {

        let result : { value: number, angle: number }[] = [];

        const T = 1 / freq;
        const k = Math.floor(T / (sequence[1].t - sequence[0].t));
        const deltaK = 360 / k;

        sequence.forEach((item, index) => {
            var angle = deltaK * index;
            result.push({ 
                value: Math.abs(item.value), 
                angle: angle 
            })
        });

        return result;
    }

export function ConvertVectorsToCoordinates(
    vectors: { value: number, angle: number }[])
    : { x: number, y: number }[] {

        let result: { x: number, y: number }[] = [];
        
        vectors.forEach(item => {
            result.push({
                x: item.value * Math.cos(item.angle * Math.PI / 180),
                y: item.value * Math.sin(item.angle * Math.PI / 180)
            });
        });

        return result;
    }

export function CalculateMassesCenter(
    seqcuences: { x: number, y: number }[])
    : number {
        const count = seqcuences.length;

        var sumMatrix = seqcuences.reduce((prev, cur) => {
            return {
                x: prev.x + cur.x,
                y: prev.y + cur.y
            }
        }, {x: 0, y: 0});

        var sumDivCount = { x: sumMatrix.x / count, y: sumMatrix.y / count }; 

        var result = Math.sqrt(
            (sumDivCount.x * sumDivCount.x) + (sumDivCount.y * sumDivCount.y)
        );

        return result;
    }
