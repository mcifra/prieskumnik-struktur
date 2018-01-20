import React from 'react';
import FormulaStorage from "./FormulaStorage";
import LanguageEditor from './LanguageEditor';
import StructureEditor from './StructureEditor';
import Language from "../../backend/Language";
import Structure from "../../backend/Structure";

class App extends React.Component {
    constructor(props) {
        super(props);
        let l = new Language();
        let s = new Structure(l);
        this.state = {
            language: l,
            structure: s
        };
    }

    setLanguage(language) {
        this.setState({
            language: language,
            structure: this.state.structure
        });
    }

    setStructure(structure) {
        this.setState({
            language: this.state.language,
            structure: structure
        });
    }

    render() {
        console.log('app rendered ...');
        console.log('STRUCTURE', this.state.structure);
        console.log('LANGUAGE', this.state.language);
        return (
            <div className={"app"}>
                <div className={"col-lg-6"}>
                    <LanguageEditor
                        language={this.state.language}
                        onChange={(language) => this.setLanguage(language)}/>
                </div>
                <div className={"col-lg-6"}>
                    <StructureEditor language={this.state.language}
                                     structure={this.state.structure}
                                     onChange={(structure) => this.setStructure(structure)}/>
                </div>
                <div className={"col-lg-12"}>
                    <FormulaStorage language={this.state.language}
                                    structure={this.state.structure}/>
                </div>
            </div>
        );
    }

}

export default App;