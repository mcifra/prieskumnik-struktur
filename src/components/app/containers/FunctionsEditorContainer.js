import {setFunctions} from "../actions";
import TextInput from '../components/TextInput';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    name: 'Predikaty',
    error: state.inputs.predicates.error
});

const mapDispatchOnProps = {
    onInputChange: setFunctions
};

const FunctionsEditorContainer=connect(
    mapStateToProps,
    mapDispatchOnProps
)(TextInput);

export default FunctionsEditorContainer;