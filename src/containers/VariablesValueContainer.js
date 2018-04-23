import {setVariablesValue} from "../actions/index";
import {connect} from 'react-redux';
import VariablesValue from "../components/app/VariablesValue";
import {lockVariables} from "../actions";

const mapStateToProps = (state) => ({
   feedback: state.structure.variables.feedback.message,
   value: state.structure.variables.value,
   locked: state.structure.variables.locked,
   teacherMode: state.common.teacherMode,
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