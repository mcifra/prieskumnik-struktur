import React from 'react';
import {Row, Col, Panel, Button, FormGroup, InputGroup, FormControl, HelpBlock, Popover, OverlayTrigger} from 'react-bootstrap';

import Conjunction from "../../backend/formula/Formula.Conjunction";
import Disjunction from "../../backend/formula/Formula.Disjunction";
import Implication from "../../backend/formula/Formula.Implication";
import Variable from "../../backend/term/Term.Variable";
import Constant from "../../backend/term/Term.Constant";
import ExistentialQuant from "../../backend/formula/Formula.ExistentialQuant";
import UniversalQuant from "../../backend/formula/Formula.UniversalQuant";
import FunctionTerm from "../../backend/term/Term.FunctionTerm";
import PredicateAtom from "../../backend/formula/Formula.PredicateAtom";
import Negation from "../../backend/formula/Formula.Negation";
import EqualityAtom from "../../backend/formula/Formula.EqualityAtom";

class ExpressionStorage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expressions: []
        };
        this.parser = require('../../backend/parser/grammar');
    }

    render() {
        const popoverHelp = (
            <Popover id='popover-trigger-click' title='Editor štruktúry'>
                Tu sa pridávajú formuly a kontroluje sa či spĺňajú vyššie definovanú štruktúru. Všetky termy a predikáty
                musia byť definované v jazyku. Ak formula spľňa štruktúru, textový vstup bude zelený, inak červený.
                Formula sa zmaže tlačidlom X vpravo.
            </Popover>
        );
        let answerSelect = null;
        if (this.props.startRule === 'formula') {
            answerSelect = (
                <select value='' onChange={null}>
                    <option value=''></option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            );
        } else {
            let domain = [...this.props.structure.domain];
            answerSelect = (
                <select>
                    <option value=''></option>
                    {domain.map((item, i) =>
                        <option value={item}>{item}</option>
                    )}
                </select>
            )
        }
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>{this.props.name}</Panel.Title>
                    <OverlayTrigger trigger='click' placement='bottom' overlay={popoverHelp}>
                        <span>?</span>
                    </OverlayTrigger>
                </Panel.Heading>
                <Panel.Body>
                    {this.state.expressions.map((current, index) =>
                        <Row key={index}>
                            <Col lg={8}>
                                <FormGroup validationState={current.satisfied ? 'success' : 'error'}>
                                    <InputGroup>
                                        <FormControl type='text' value={current.formula}
                                                     onChange={(e) => this.checkExpression(e, index)}/>
                                        <InputGroup.Button>
                                            <Button onClick={() => this.deleteExpression(index)}>✖</Button>
                                        </InputGroup.Button>
                                    </InputGroup>
                                    <HelpBlock>{current.validationMessage}</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col lg={2}>
                                <FormGroup>
                                    <InputGroup>
                                        {answerSelect}
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col lg={2}>

                            </Col>
                        </Row>
                    )}
                    <Button bsStyle='success' onClick={() => this.addExpression()}>➕ Pridaj</Button>
                </Panel.Body>
            </Panel>
        );
    }

    addExpression() {
        let expressions = this.state.expressions;
        expressions.push({
            formula: '',
            valid: true,
            validationMessage: '',
            formulaObj: null,
            satisfied: false
        });
        this.setState({
            expressions: expressions
        });
    }

    deleteExpression(i) {
        this.setState({
            expressions: this.state.expressions.filter((_, index) => i !== index)
        });
    }

    setParserOptions() {
        return {
            startRule: this.props.startRule,
            structure: this.props.structure,
            conjunction: Conjunction,
            disjunction: Disjunction,
            implication: Implication,
            variable: Variable,
            constant: Constant,
            existentialQuant: ExistentialQuant,
            universalQuant: UniversalQuant,
            functionTerm: FunctionTerm,
            predicate: PredicateAtom,
            negation: Negation,
            equalityAtom: EqualityAtom
        }
    }

    checkExpression(e, index) {
        let givenExpression = e.target.value;
        let options = this.setParserOptions();
        let expressions = this.state.expressions;
        expressions[index].formula = givenExpression;
        try {
            let parsedExpression = null;
            if (givenExpression.length > 0) {
                parsedExpression = this.parser.parse("(" + givenExpression + ")", options);
            }
            console.log('Parsed expression:', parsedExpression);
            let sat = this.evaluateExpression(parsedExpression);
            expressions[index].validationMessage = '';
            expressions[index].valid = true;
            expressions[index].formulaObj = parsedExpression;
            expressions[index].satisfied = sat;
            console.log('Final expression:', expressions[index]);
        } catch (e) {
            console.error(e);
            expressions[index].validationMessage = e.message;
            expressions[index].valid = false;
            expressions[index].formulaObj = null;
            expressions[index].satisfied = false;
        }
        this.setState({
            expressions: expressions
        });
    }

    evaluateExpression(expression) {
        let e = new Map();
        // Temporary
        e.set('x', 'a');
        e.set('y', 'b');
        return expression.eval(this.props.structure, e);
    }

}

export default ExpressionStorage;