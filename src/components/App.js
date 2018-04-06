import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {createStore} from 'redux';
import reducer from '../reducers/index';
import {Provider} from 'react-redux';
import ExpressionsContainer from '../containers/ExpressionsContainer';
import VariablesValueContainer from "../containers/VariablesValueContainer";
import LanguageContainer from '../containers/LanguageContainer';
import StructureContainer from '../containers/StructureContainer';

const store = createStore(reducer);

// po kazdej zmene stavu sa vypise
store.subscribe(() => {
    let state = store.getState();
    console.log('STATE:', state);
});

// precitanie vstupneho suboru a importovanie
function readFile(event) {
    let file = event.target.files[0];
    let fr = new FileReader();
    fr.onload = function (e) {
        store.dispatch({type: 'IMPORT_APP', content: e.target.result});
    };
    fr.readAsText(file);
}

const App = () => (
    <Provider store={store}>
        <div className={"app"}>
            <button onClick={(e) => store.dispatch({type: 'EXPORT_APP'})}>Export</button>
            <input type='file' name='jsonFile' onChange={e => readFile(e)}/>
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
