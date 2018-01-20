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
        return (
            <div className={"app"}>
                <div className={"col-lg-6"}>
                    <LanguageEditor structure={this.state.structure} onChange={(structure) => this.setStructure(structure)}/>
                </div>
                <div className={"col-lg-6"}>
                    <StructureEditor structure={this.state.structure} onChange={(structure) => this.setStructure(structure)}/>
                </div>
                <div className={"col-lg-12"}>
                    <FormulaStorage structure={this.state.structure}/>
                </div>
            </div>
        );
    }

}

export default App;