import {setDomain} from "../actions";
import TextInput from "../components/TextInput";
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        name: 'Domena',
        error: state.inputs.structure.domain.error
    }
}

const mapDispatchOnProps = {
    onInputChange: setDomain
};

const DomainEditorContainer = connect(
    mapStateToProps,
    mapDispatchOnProps
)(TextInput);

export default DomainEditorContainer;