import {setPredicateValue, setEditMode} from "../actions";
import {connect} from 'react-redux';
import PredicatesValueEditor from "../components/PredicatesValueEditor";

const mapStateToProps = (state) => ({
    predicates: state.inputs.structure.predicates,
    structure: state.structure
});

const mapDispatchOnProps = {
    onInputChange: setPredicateValue,
    onChangeEditMode: setEditMode
};

const PredicatesValueEditorContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(PredicatesValueEditor);

export default PredicatesValueEditorContainer;