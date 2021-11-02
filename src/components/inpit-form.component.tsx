export const InputForm: React.FunctionComponent<{delta: number, series: number[]}> = ({delta, series}) => {
    
    var str = "";

    series.forEach(item => {
        str += item + ", ";
    });

    return (
        <div className="card">
            <div className="card-header">
                Input forms
            </div>
            <div className="card-body">
                <div className="mg-3">
                    <label className="form-label">delta t</label>
                    <input className="form-control" type="number" value={delta.toString()} />
                </div>
                <div className="mg-3">
                    <label className="form-label">delta t</label>
                    <input className="form-control" type="number" value={str} />
                </div>

                <button className="btn btn-primary">Calculate</button>
            </div>
        </div>
    );
};