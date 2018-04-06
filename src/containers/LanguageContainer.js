import {connect} from 'react-redux';
import {setConstants, setFunctions, setPredicates} from "../actions/index";
import Language from '../components/app/Language';

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