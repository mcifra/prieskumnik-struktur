import React from 'react';
import {Col, Row, Modal, Button, ButtonToolbar} from 'react-bootstrap';
import {createStore} from 'redux';
import reducer from '../../reducers/root';
import {Provider} from 'react-redux';
import ExpressionsContainer from '../../containers/ExpressionsContainer';
import VariablesValueContainer from "../../containers/VariablesValueContainer";
import LanguageContainer from '../../containers/LanguageContainer';
import StructureContainer from '../../containers/StructureContainer';
import DownloadButton from './lib/DownloadButton';
import {toggleTeacherMode} from "../../actions/index";
import Toggle from 'react-toggle';
import FontAwesome from 'react-fontawesome';
import {importAppState} from "../../actions";
import {DEFAULT_FILE_NAME} from "../../constants";

const store = createStore(reducer);

// po kazdej zmene stavu sa vypise
store.subscribe(() => {
  let state = store.getState();
  console.log('STATE:', state);
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      exerciseName: ''
    };
    this.exportState = this.exportState.bind(this);
    this.importState = this.importState.bind(this);
  }

  exportState() {
    let state = store.getState();
    let json = JSON.stringify({
      common: state.common,
      language: state.language,
      structure: state.structure,
      expressions: state.expressions
    });
    if (this.state.exerciseName.length === 0) {
      this.state.exerciseName = DEFAULT_FILE_NAME;
    }
    return {
      mime: 'application/json',
      filename: this.state.exerciseName + '.json',
      contents: json
    }
  }

  importState(e) {
    let file = e.target.files[0];
    let fr = new FileReader();
    fr.onload = function (e) {
      store.dispatch(importAppState(e.target.result));
    };
    fr.readAsText(file);
  }

  render() {
    return (
       <Provider store={store}>
         <div className='app'>
           <Row>
             <div className='toolbar'>
               <div className='col-xs-7 toolbar-import-export'>
                 <ButtonToolbar>
                   <button className='btn btn-lock' onClick={() => this.setState({modalShow: true})}>
                     <FontAwesome name='download'/>
                     <span className='toolbar-btn-label-1'>Uložiť</span>
                     <span className='toolbar-btn-label-2'>cvičenie</span>
                   </button>
                   <label className="btn btn-lock">
                     <FontAwesome name='upload'/>
                     <span className='toolbar-btn-label-1'>Importovať</span>
                     <span className='toolbar-btn-label-2'>cvičenie</span>
                     <input type="file" name='jsonFile'
                            onChange={e => this.importState(e)}
                            hidden={true}
                            style={{display: 'none'}}/>
                   </label>
                 </ButtonToolbar>
               </div>
               <div className='col-xs-5 toolbar-mode-toggle'>
                 <label className='teacher-mode'>
                   <Toggle
                      defaultChecked={store.getState().teacherMode}
                      onChange={() => store.dispatch(toggleTeacherMode())}/>
                   <span className='teacher-mode-span'>Učiteľský mód</span>
                 </label>
               </div>
               <Modal show={this.state.modalShow} onHide={() => this.setState({modalShow: false})}>
                 <Modal.Header>
                   <Modal.Title>Uložiť štruktúru</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                   <div className='form-inline'>
                     <div className='form-group'>
                       <label className='exercise-name-label' htmlFor="exercise-name">Cvičenie: </label>
                       <input type="text" className="exercise-name-input form-control" id="exercise-name"
                              placeholder={DEFAULT_FILE_NAME}
                              onChange={(e) => this.setState({exerciseName: e.target.value})}/>
                     </div>
                   </div>
                 </Modal.Body>
                 <Modal.Footer>
                   <DownloadButton genFile={this.exportState} downloadTitle='Uložiť'
                                   className='btn btn-success'/>
                   <Button bsStyle='primary' onClick={() => this.setState({modalShow: false})}>Zrušiť</Button>
                 </Modal.Footer>
               </Modal>
             </div>
           </Row>
           <Row>
             <Col sm={6}>
               <LanguageContainer/>
               <VariablesValueContainer/>
             </Col>
             <Col sm={6}>
               <StructureContainer/>
             </Col>
           </Row>
           <Row>
             <Col sm={12}>
               <ExpressionsContainer/>
             </Col>
           </Row>
         </div>
       </Provider>
    );
  }
}

export default App;
