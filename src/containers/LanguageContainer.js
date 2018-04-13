import {connect} from 'react-redux';
import {setConstants, setFunctions, setPredicates} from "../actions/index";
import Language from '../components/app/Language';
import {lockConstants, lockFunctions, lockPredicates} from "../actions";

const mapStateToProps = (state) => ({
   inputs: state.inputs,
   mode: state.mode
});

const mapDispatchToProps = {
   onConstantsChange: setConstants,
   onPredicatesChange: setPredicates,
   onFunctionsChange: setFunctions,
   lockConstants: lockConstants,
   lockPredicates: lockPredicates,
   lockFunctions: lockFunctions
};

const LanguageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Language);

export default LanguageContainer;