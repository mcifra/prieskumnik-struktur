import React from 'react';
import FormulaStorage from "./FormulaStorage";
import LanguageEditor from './LanguageEditor';
import StructureEditor from './StructureEditor';
import Language from "../../backend/Language";
import Structure from "../../backend/Structure";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            structure: new Structure(new Language())
        };
    }

    setStructure(structure) {
        this.setState({
            structure: structure
        });
    }

    render() {
        console.log('STRUCTURE', this.state.structure);
        let c = [...this.state.structure.language.constants];
        let p = [...this.state.structure.language.predicates];
        let f = [...this.state.structure.language.functions];
        let d=[...this.state.structure.domain];
        let cStr = '';
        let pStr='';
        let fStr='';
        let dStr='';
        for (let i = 0; i < c.length; i++) {
            cStr += c[i] + ' ';
        }
        for (let i = 0; i < p.length; i++) {
            pStr += p[i][0] + ' ';
        }
        for (let i = 0; i < f.length; i++) {
            fStr += f[i][0] + ' ';
        }
        for (let i = 0; i < d.length; i++) {
            dStr += d[i] + ' ';
        }
        console.log(cStr);
        return (
            <div className={"app"}>
                <ul>
                    <li>
                        {cStr}
                    </li>
                    <li>
                        {pStr}
                    </li>
                    <li>
                        {fStr}
                    </li>
                    <li>
                        {dStr}
                    </li>
                </ul>
                <div className={"col-lg-6"}>
                    <LanguageEditor structure={this.state.structure}
                                    onChange={(structure) => this.setStructure(structure)}/>
                </div>
                <div className={"col-lg-6"}>
                    <StructureEditor structure={this.state.structure}
                                     onChange={(structure) => this.setStructure(structure)}/>
                </div>
                <div className={"col-lg-12"}>
                    <FormulaStorage structure={this.state.structure}/>
                </div>

            </div>
        );
    }

}

export default App;