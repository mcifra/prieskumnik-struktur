import {setPredicates} from "../actions";
import TextInput from '../components/TextInput';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    name: 'Funkcie',
    error: state.inputs.functions.error
});

const mapDispatchOnProps = {
    onInputChange: setPredicates
};

const PredicatesEditorContainer=connect(
    mapStateToProps,
    mapDispatchOnProps
)(TextInput);

export default PredicatesEditorContainer;