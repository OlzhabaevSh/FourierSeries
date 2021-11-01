import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import Card from "./card.component";

export const InputForm: React.FunctionComponent<{delta: number, series: number[]}> = ({delta, series}) => {
    
    var str = "";

    series.forEach(item => {
        str += item + ", ";
    });

    return (
        <Card title="Input forms">
            <Stack>
                <TextField label="delta t" value={delta.toString()} />
                <TextField label="series" multiline={true} value={str} />
                
                <br />
                <PrimaryButton text="Calculate" />
            </Stack>  
        </Card>
    );
};