import {connect} from 'react-redux';
import {
    setConstantValue, setDomain, setFunctionValueTable, setFunctionValueText, setPredicateValueTable,
    setPredicateValueText,
    setVariablesValue, toggleTable
} from "../actions/index";
import Structure from '../components/app/Structure';

const mapStateToProps = (state) => ({
    inputs: state.inputs,
    structure: state.structure
});

const mapDispatchToProps = {
    onDomainChange: setDomain,
    onConstantValueChange: setConstantValue,
    onPredicateValueChangeText: setPredicateValueText,
    onPredicateValueChangeTable: setPredicateValueTable,
    onFunctionValueChangeText: setFunctionValueText,
    onFunctionValueChangeTable: setFunctionValueTable,
    onVariablesValueChange: setVariablesValue,
    toggleTable: toggleTable
};

const StructureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Structure);

export default StructureContainer;