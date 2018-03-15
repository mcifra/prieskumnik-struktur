import {setConstantValue} from "../actions";
import {connect} from 'react-redux';
import ConstantsValueEditor from "../components/ConstantsValueEditor";

const mapStateToProps = (state) => ({
    constants: state.inputs.structure.constants,
    domain:state.structure.domain
});

const mapDispatchOnProps = {
    onInputChange: setConstantValue
};

const ConstantsValueEditorContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(ConstantsValueEditor);

export default ConstantsValueEditorContainer;