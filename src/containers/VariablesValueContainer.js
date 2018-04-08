import {setVariablesValue} from "../actions/index";
import {connect} from 'react-redux';
import VariablesValue from "../components/app/VariablesValue";
import {lockVariables} from "../actions";

const mapStateToProps = (state) => ({
    feedback: state.inputs.variableValues.feedback.message,
    value: state.inputs.variableValues.value,
    locked: state.inputs.variableValues.locked
});

const mapDispatchOnProps = {
    onInputChange: setVariablesValue,
    lockInput: lockVariables
};

const VariablesValueContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(VariablesValue);

export default VariablesValueContainer;