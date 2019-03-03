import React from 'react';
import { Segment, Button, Input,Modal,Icon} from 'semantic-ui-react';
import firebase from '../../FireBase';



class FileModal extends React.Component {
    state = {
      message: "",
      channel: this.props.currentChannel,
      user: this.props.currentUser,
      loading: false,
      errors: [],
      modal:false
    };
  

    render() {
      const { modal, closeModal } = this.props;
  
      return (
        <Modal basic open={modal} onCLose={closeModal}>
            <Modal.Header>Select an Image File</Modal.Header>
            <Modal.Content>
                <Input
                fluid
                label="File types: jpg, png, pdf, docx"
                name="file"
                type="file"
                />
            </Modal.Content>

            <Modal.Actions>
                <Button
                color="green"
                inverted>
                <Icon name="checkmark"/> Send
                </Button>

                <Button
                color="red"
                inverted
                onClick={closeModal}
                >
                <Icon name="remove"/> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
      );
    }
  }
  
  export default FileModal;
  