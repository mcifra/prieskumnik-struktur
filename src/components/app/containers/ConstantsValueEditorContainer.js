import {setConstantValue} from "../actions";
import {connect} from 'react-redux';
import ConstantsValueEditor from "../components/ConstantsValueEditor";

function mapStateToProps(state) {
    return {
        name: 'Hodnoty konstant',
        constants: state.inputs.structure.constants,
        domain:state.structure.domain
    }
}

const mapDispatchOnProps = {
    onInputChange: setConstantValue
};

const ConstantsEditorValueContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(ConstantsValueEditor);

export default ConstantsEditorValueContainer;