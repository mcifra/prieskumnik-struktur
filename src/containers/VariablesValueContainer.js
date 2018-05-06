import {setVariablesValue} from "../actions/index";
import {connect} from 'react-redux';
import VariablesValue from "../components/app/VariablesValue";
import {lockVariables} from "../actions";

const mapStateToProps = (state) => ({
  teacherMode: state.common.teacherMode,
  variables: state.structure.variables
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