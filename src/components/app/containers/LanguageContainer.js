import {connect} from 'react-redux';
import {setConstants, setFunctions, setPredicates} from "../actions";
import Language from '../components/Language';

const mapStateToProps = (state) => ({
    inputs: state.inputs
});

const mapDispatchToProps = {
    onConstantsChange: setConstants,
    onPredicatesChange: setPredicates,
    onFunctionsChange: setFunctions
};

const LanguageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Language);

export default LanguageContainer;