import {connect} from 'react-redux';
import {setConstants, setFunctions, setPredicates} from "../actions/index";
import Language from '../components/app/Language';
import {lockConstants, lockFunctions, lockPredicates} from "../actions";

const mapStateToProps = (state) => ({
   language: state.language,
   teacherMode: state.common.teacherMode
});

const mapDispatchToProps = {
   setConstants: setConstants,
   setPredicates: setPredicates,
   setFunctions: setFunctions,
   lockConstants: lockConstants,
   lockPredicates: lockPredicates,
   lockFunctions: lockFunctions
};

const LanguageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Language);

export default LanguageContainer;