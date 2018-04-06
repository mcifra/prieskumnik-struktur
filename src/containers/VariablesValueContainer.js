import {setVariablesValue} from "../actions/index";
import {connect} from 'react-redux';
import VariablesValue from "../components/app/VariablesValue";

const mapStateToProps = (state) => ({
    feedback: state.inputs.variableValues.feedback.message,
    value: state.inputs.variableValues.value
});

const mapDispatchOnProps = {
    onInputChange: setVariablesValue
};

const VariablesValueContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(VariablesValue);

export default VariablesValueContainer;