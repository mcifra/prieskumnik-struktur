import React from 'react';
import {Row, Col, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {createStore} from 'redux';
import reducer from '../reducers/index';
import {Provider} from 'react-redux';
import ExpressionsContainer from '../containers/ExpressionsContainer';
import VariablesValueContainer from "../containers/VariablesValueContainer";
import LanguageContainer from '../containers/LanguageContainer';
import StructureContainer from '../containers/StructureContainer';
import DownloadButton from './app/lib/DownloadButton';
import {STUDENT_MODE, TEACHER_MODE} from "../constants";
import {setMode} from "../actions";

const store = createStore(reducer);

// po kazdej zmene stavu sa vypise
store.subscribe(() => {
    let state = store.getState();
    console.log('STATE:', state);
});

function importState(e) {
    let file = e.target.files[0];
    let fr = new FileReader();
    fr.onload = function (e) {
        store.dispatch({type: 'IMPORT_APP', content: e.target.result});
    };
    fr.readAsText(file);
}

function exportState() {
    let state = store.getState();
    let json = JSON.stringify({mode: state.mode, inputs: state.inputs, expressions: state.expressions});
    return {
        mime: 'application/json',
        filename: 'export.json',
        contents: json
    }
}

const App = () => (
    <Provider store={store}>
        <div className={"app"}>
            <div className='row import-export-bar'>
                <div className='col-md-6'>
                    <Button bsStyle='info' onClick={e => store.dispatch(setMode(STUDENT_MODE))}>Študent mód</Button>
                    <Button bsStyle='info' onClick={e => store.dispatch(setMode(TEACHER_MODE))}>Učiteľ mód</Button>
                    <label className="btn btn-info">
                        Import cvičenia <input type="file" name='jsonFile' onChange={e => importState(e)} hidden={true}
                                               style={{display: 'none'}}/>
                    </label>
                    <DownloadButton genFile={exportState} downloadTitle='Uloženie cvičenia'
                                    className='btn btn-info'/>
                </div>
                <div className='col-md-6'>
                    <span className='bug-report'>Ak ste objavili chybu, <a href='https://github.com/mcifra/prieskumnik-struktur/issues'>oznámte nám ju</a>.</span>
                </div>
            </div>
            <Row>
                <Col md={6}>
                    <LanguageContainer/>
                    <VariablesValueContainer/>
                </Col>
                <Col md={6}>
                    <StructureContainer/>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <ExpressionsContainer/>
                </Col>
            </Row>
        </div>
    </Provider>
);

// const App = () => (
//     <div>
//
//     </div>
// );

export default App;
