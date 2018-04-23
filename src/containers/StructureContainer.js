import {connect} from 'react-redux';
import {
   setConstantValue,
   setDomain,
   setFunctionValueTable,
   setFunctionValueText,
   setPredicateValueTable,
   setPredicateValueText,
   setVariablesValue,
   toggleTable
} from "../actions/index";
import Structure from '../components/app/Structure';
import {lockConstantValue, lockDomain, lockFunctionValue, lockPredicateValue} from "../actions";

const mapStateToProps = (state) => ({
   language: state.language,
   structure: state.structure,
   structureObject: state.structureObject,
   teacherMode: state.common.teacherMode,
   domain: [...state.structureObject.domain]
});

const mapDispatchToProps = {
   onDomainChange: setDomain,
   onConstantValueChange: setConstantValue,
   onPredicateValueChangeText: setPredicateValueText,
   onPredicateValueChangeTable: setPredicateValueTable,
   onFunctionValueChangeText: setFunctionValueText,
   onFunctionValueChangeTable: setFunctionValueTable,
   onVariablesValueChange: setVariablesValue,
   toggleTable: toggleTable,
   lockDomain: lockDomain,
   lockConstantValue: lockConstantValue,
   lockPredicateValue: lockPredicateValue,
   lockFunctionValue: lockFunctionValue
};

const StructureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Structure);

export default StructureContainer;