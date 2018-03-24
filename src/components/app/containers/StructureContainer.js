import {connect} from 'react-redux';
import {
    setConstantValue, setDomain, setFunctionValue, setPredicateValue,
    setVariablesValue, toggleTable
} from "../actions";
import Structure from '../components/Structure';

const mapStateToProps = (state) => ({
    inputs: state.inputs,
    structure: state.structure
});

const mapDispatchToProps = {
    onDomainChange: setDomain,
    onConstantValueChange: setConstantValue,
    onPredicateValueChange: setPredicateValue,
    onFunctionValueChange: setFunctionValue,
    onVariablesValueChange: setVariablesValue,
    toggleTable: toggleTable
};

const StructureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Structure);

export default StructureContainer;