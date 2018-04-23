import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {createStore} from 'redux';
import reducer from '../reducers/root';
import {Provider} from 'react-redux';
import ExpressionsContainer from '../containers/ExpressionsContainer';
import VariablesValueContainer from "../containers/VariablesValueContainer";
import LanguageContainer from '../containers/LanguageContainer';
import StructureContainer from '../containers/StructureContainer';
import DownloadButton from './app/lib/DownloadButton';
import {toggleTeacherMode} from "../actions";
import Toggle from 'react-toggle';

const store = createStore(reducer);

let exerciseName = '';

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
   let json = JSON.stringify({
      common: state.common,
      language: state.language,
      structure: state.structure,
      expressions: state.expressions
   });
   if (exerciseName.length === 0)
      exerciseName = 'struktura';
   return {
      mime: 'application/json',
      filename: exerciseName + '.json',
      contents: json
   }
}

const App = () => (
    <Provider store={store}>
       <div className={"app"}>
          <div className='row'>
             <div className='col-md-12'>
                <div className='import-export-bar'>
                   <div className='form-inline'>
                      <div className='form-group'>
                         <label className='exercise-name-label' htmlFor="exercise-name">Cvičenie: </label>
                         <input type="text" className="exercise-name-input form-control" id="exercise-name"
                                placeholder="struktura"
                                onChange={(e) => exerciseName = e.target.value}/>
                      </div>
                      <DownloadButton genFile={exportState} downloadTitle='Uložiť'
                                      className='btn btn-lock'/>
                   </div>
                   <label className="btn btn-lock">
                      Importovať cvičenie <input type="file" name='jsonFile' onChange={e => importState(e)}
                                                 hidden={true}
                                                 style={{display: 'none'}}/>
                   </label>
                   <label className='teacher-mode'>
                      <Toggle
                          defaultChecked={store.getState().teacherMode}
                          onChange={() => store.dispatch(toggleTeacherMode())}/>
                      <span className='teacher-mode-span'>Učiteľský mód</span>
                   </label>
                </div>
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

export default App;
