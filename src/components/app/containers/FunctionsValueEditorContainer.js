import {setFunctionValue} from "../actions";
import {connect} from 'react-redux';
import FunctionsValueEditor from "../components/FunctionsValueEditor";

const mapStateToProps = (state) => ({
    functions: state.inputs.structure.functions
});

const mapDispatchOnProps = {
    onInputChange: setFunctionValue
};

const FunctionsValueEditorContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(FunctionsValueEditor);

export default FunctionsValueEditorContainer;