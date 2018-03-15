import {setVariablesValue} from "../actions";
import {connect} from 'react-redux';
import VariablesValue from "../components/VariablesValue";

const mapStateToProps = (state) => ({
    error: state.inputs.variableValues.error,
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