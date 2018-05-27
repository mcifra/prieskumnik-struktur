import React from 'react';
import {Col, FormGroup, HelpBlock, Panel, Row} from "react-bootstrap";
import TextInput from "./inputs/TextInput";

const help = (
   <div className="collapse" id="help-language">
     <div className="well">
       Tu sa definuje jazyk. <strong>Symboly konštánt</strong> sa definujú oddelene
       čiarkou. <strong>Symboly predikátov</strong> sa definujú oddelené čiarkami, vo
       formáte <code>predikat/arita</code>. <strong>Symboly funkcií</strong> sa definujú oddelené čiarkami, vo
       formáte <code>funkcia/arita</code>.
     </div>
   </div>
);

const Language = (props) => (
   <Panel>
     <Panel.Heading>
       <Panel.Title componentClass='h2'>Jazyk 𝓛</Panel.Title>
       <span data-toggle="collapse" data-target="#help-language"
             aria-expanded="false"
             aria-controls="collapseExample">
                    ?
                 </span>
     </Panel.Heading>
     <Panel.Body>
       {help}
       <Row>
         <Col lg={12}>
           <fieldset>
             <legend>Symboly konštánt</legend>
             <FormGroup
                validationState={props.language.constants.errorMessage.length > 0 ? 'error' : null}>
               <TextInput onChange={(e) => props.setConstants(e.target.value)}
                          onLock={() => props.lockConstants()}
                          textData={props.language.constants}
                          label={<span>𝓒<sub>𝓛</sub> = &#123;</span>}
                          teacherMode={props.teacherMode}
                          id='language-editor-constants'
                          placeholder='a, b, c, ...'/>
               <HelpBlock>{props.language.constants.errorMessage}</HelpBlock>
             </FormGroup>
           </fieldset>
         </Col>
       </Row>
       <Row>
         <Col lg={12}>
           <fieldset>
             <legend>Predikátové symboly</legend>
             <FormGroup
                validationState={props.language.predicates.errorMessage.length > 0 ? 'error' : null}>
               <TextInput onChange={(e) => props.setPredicates(e.target.value)}
                          onLock={() => props.lockPredicates()}
                          textData={props.language.predicates}
                          label={<span>𝓟<sub>𝓛</sub> = &#123;</span>}
                          teacherMode={props.teacherMode}
                          id='language-editor-predicates'
                          placeholder='likes/2, hates/2, man/1, ...'/>
               <HelpBlock>{props.language.predicates.errorMessage}</HelpBlock>
             </FormGroup>
           </fieldset>
         </Col>
       </Row>
       <Row>
         <Col lg={12}>
           <fieldset>
             <legend>Funkčné symboly</legend>
             <FormGroup
                validationState={props.language.functions.errorMessage.length > 0 ? 'error' : null}>
               <TextInput onChange={(e) => props.setFunctions(e.target.value)}
                          onLock={() => props.lockFunctions()}
                          textData={props.language.functions}
                          label={<span>𝓕<sub>𝓛</sub> = &#123;</span>}
                          teacherMode={props.teacherMode}
                          id='language-editor-functions'
                          placeholder='mother/1, father/1, ...'/>
               <HelpBlock>{props.language.functions.errorMessage}</HelpBlock>
             </FormGroup>
           </fieldset>
         </Col>
       </Row>
     </Panel.Body>
   </Panel>
);

export default Language;