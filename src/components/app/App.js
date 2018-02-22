import React from 'react';
import {Row, Col} from 'react-bootstrap';

import FormulaStorage from "./FormulaStorage";
import LanguageEditor from './LanguageEditor';
import StructureEditor from './StructureEditor';
import Language from "../../backend/Language";
import Structure from "../../backend/Structure";
import ExpressionStorage from './ExpressionStorage';

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
                <Row>
                    <Col md={6}>
                        <LanguageEditor structure={this.state.structure}
                                        onChange={(structure) => this.setStructure(structure)}/>
                    </Col>
                    <Col md={6}>
                        <StructureEditor structure={this.state.structure}
                                         onChange={(structure) => this.setStructure(structure)}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <ExpressionStorage name='Spĺňanie formuly v štruktúre' startRule='formula' structure={this.state.structure} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <ExpressionStorage name='Hodnota termu' startRule='term' structure={this.state.structure} />
                    </Col>
                </Row>
            </div>
        );
    }

}

export default App;