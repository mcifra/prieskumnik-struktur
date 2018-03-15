import {setConstants} from "../actions";
import TextInput from "../components/TextInput";
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        name: 'Konstanty',
        error: state.inputs.constants.error
    }
}

const mapDispatchOnProps = {
    onInputChange: setConstants
};

const ConstantsEditorContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(TextInput);

export default ConstantsEditorContainer;