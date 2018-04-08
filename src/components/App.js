import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {createStore} from 'redux';
import reducer from '../reducers/index';
import {Provider} from 'react-redux';
import ExpressionsContainer from '../containers/ExpressionsContainer';
import VariablesValueContainer from "../containers/VariablesValueContainer";
import LanguageContainer from '../containers/LanguageContainer';
import StructureContainer from '../containers/StructureContainer';
import DownloadButton from './app/lib/DownloadButton';

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
    let json = JSON.stringify({inputs: state.inputs, expressions: state.expressions});
    return {
        mime: 'application/json',
        filename: 'export.json',
        contents: json
    }
}

const App = () => (
    <Provider store={store}>
        <div className={"app"}>

            <label className="btn btn-success">
                Import <input type="file" name='jsonFile' onChange={e => importState(e)} hidden={true}
                              style={{display: 'none'}}/>
            </label>
            <DownloadButton genFile={exportState} downloadTitle='Export' className='btn btn-success'/>

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
