import {connect} from 'react-redux';
import {
  setConstantValue,
  setDomain,
  setFunctionValueTable,
  setFunctionValueText,
  setPredicateValueTable,
  setPredicateValueText,
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
  setDomain: setDomain,
  setConstantValue: setConstantValue,
  setPredicateValueText: setPredicateValueText,
  setPredicateValueTable: setPredicateValueTable,
  setFunctionValueText: setFunctionValueText,
  setFunctionValueTable: setFunctionValueTable,
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