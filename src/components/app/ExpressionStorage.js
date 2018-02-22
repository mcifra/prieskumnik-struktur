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
                                <FormGroup validationState={current.eval ? 'success' : 'error'}>
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
                                        {this.getAnswerSelect(index)}
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

    getAnswerSelect(index) {
        if (this.props.startRule === 'formula') {
            return (
                <select value='' onChange={(e) => this.evaluateExpression(index, e)}>
                    <option value=''></option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            );
        } else {
            let domain = [...this.props.structure.domain];
            return (
                <select value='' onChange={(e) => this.evaluateExpression(index, e)}>
                    <option value=''></option>
                    {domain.map((item, i) =>
                        <option value={item}>{item}</option>
                    )}
                </select>
            )
        }
    }

    addExpression() {
        let expressions = this.state.expressions;
        expressions.push({
            expression: '',
            validSyntax: true,
            validationMessage: '',
            parsedObject: null,
            eval: false
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
        expressions[index].expression = givenExpression;
        try {
            let parsedExpression = null;
            if (givenExpression.length > 0) {
                parsedExpression = this.parser.parse("(" + givenExpression + ")", options);
            }
            console.log('Parsed expression:', parsedExpression);
            expressions[index].validationMessage = '';
            expressions[index].validSyntax = true;
            expressions[index].parsedObject = parsedExpression;
            console.log('Final expression:', expressions[index]);
        } catch (e) {
            console.error(e);
            expressions[index].validationMessage = e.message;
            expressions[index].validSyntax = false;
            expressions[index].parsedObject = null;
        }
        this.setState({
            expressions: expressions
        });
    }

    evaluateExpression(expressionIndex, e) {
        let givenValue = e.target.value;
        let expressions = this.state.expressions;

        // Temporary
        let eVar = new Map();
        eVar.set('x', 'a');
        eVar.set('y', 'b');

        if (expressions[expressionIndex].parsedObject == null || !expressions[expressionIndex].validSyntax) {
            console.log('Koniec');
            return;
        }

        // Vrati true/false (formula), alebo hodnotu z domeny (term)
        let value = expressions[expressionIndex].parsedObject.eval(this.props.structure, eVar);
        givenValue = (givenValue === 'true');
        expressions[expressionIndex].eval = (value === givenValue);

        this.setState({
            expressions: expressions
        });

    }

}

export default ExpressionStorage;