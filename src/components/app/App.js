import React from 'react';
import FormulaStorage from "./FormulaStorage";

class App extends React.Component {
    render() {
        return (
            <div className={"app"}>
                <h2>Zoznam formúl</h2>
                <FormulaStorage/>
            </div>
        );
    }
}

export default App;