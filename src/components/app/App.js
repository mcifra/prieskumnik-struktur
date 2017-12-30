import React from 'react';
import FormulaStorage from "./FormulaStorage";
import LanguageEditor from './LanguageEditor';
import StructureEditor from './StructureEditor';
import Language from "../../backend/Language";
import Structure from "../../backend/Structure";

class App extends React.Component {
    constructor(props) {
        super(props);
        var l = new Language();
        var s = new Structure(l);
        this.state = {
            language: l,
            structure: s
        };
        this.updateLanguageState = this.updateLanguageState.bind(this);
        this.updateLanguageConstants = this.updateLanguageConstants.bind(this);
        this.updateLanguageFunctions = this.updateLanguageFunctions.bind(this);
        this.updateLanguagePredicates = this.updateLanguagePredicates.bind(this);
        this.updateDomain = this.updateDomain.bind(this);
    }

    updateLanguageState(language) {
        this.setState({
            language: language
        });
    }

    updateLanguageConstants(constants) {

        var l=this.state.language;
        l.clearConstants();

        for (let i = 0; i < constants.length; i++) {
            l.addConstant(constants[i]);
        }
        this.setState({
            language: l,
            structure: this.state.structure
        });
    }

    updateLanguageFunctions(functions) {
        this.state.language.clearFunctions();
        for (let i = 0; i < functions.length; i++) {
            this.state.language.addFunction(functions[i].name, functions[i].arity);
        }
    }

    updateLanguagePredicates(predicates) {
        this.state.language.clearPredicates();
        for (let i = 0; i < predicates.length; i++) {
            this.state.language.addPredicate(predicates[i].name, predicates[i].arity);
        }
    }

    updateDomain(domain) {
        this.state.structure.clearDomain();
        var s = this.state.structure;
        for (var i = 0; i < domain.length; i++) {
            s.addDomainItem(domain[i]);
        }
        this.setState({
            language: this.state.language,
            structure: this.state.structure
        });
    }

    render() {
        return (
            <div className={"app"}>

                <LanguageEditor
                    onConstantsChange={this.updateLanguageConstants}
                    onFunctionsChange={this.updateLanguageFunctions}
                    onPredicatesChange={this.updateLanguagePredicates}/>

                <StructureEditor language={this.state.language} structure={this.state.structure} onDomainChange={this.updateDomain} />

                <FormulaStorage language={this.state.language} structure={this.state.structure} />

            </div>
        );
    }

}

export default App;