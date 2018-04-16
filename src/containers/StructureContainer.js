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
   inputs: state.inputs,
   structure: state.structure,
   teacherMode: state.teacherMode,
   domain: [...state.structure.domain]
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