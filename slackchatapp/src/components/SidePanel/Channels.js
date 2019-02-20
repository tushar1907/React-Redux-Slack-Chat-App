import React, { Component } from 'react'
import { Menu, MenuItem, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

export default class Channels extends Component {

    state = {
        channels: [],
        modal: false,
        channelName: '',
        channelDetails: ''
    }

    closeModal=()=> this.setState({modal: false});

    openModal=()=> this.setState({modal: true});

    handleChange = (event) =>{
      this.setState({[event.target.name]: event.target.value})
    }
  render() {
    const {channels,modal} = this.state;
    return (
      <React.Fragment>
      <Menu.Menu style={{ paddingBottom: '2em'}}>

      <MenuItem>
      <span>
          <Icon name='exchange' /> CHANNELS
      </span>
      ({channels.length}) <Icon name='add' onClick={this.openModal}/>
      </MenuItem>

      {/* Channels */}

      {/* Add Chanel Modal */}
      </Menu.Menu>

      <Modal basic open={modal} onClose={this.closeModal}>

            <Modal.Header>All a Channel</Modal.Header>
            <Modal.Content>
              <Form>

                <Form.Field>
                  <Input fluid label="Name of Channel" name='channelName' onChange={this.handleChange}/>
                </Form.Field>

                <Form.Field>
                  <Input fluid label="About the Channel" name='channelDetail' onChange={this.handleChange}/>
                </Form.Field>

              </Form>
            </Modal.Content>

            <Modal.Actions>
              <Button color='green' onClick={this.closeModal} inverted>
              <Icon name='checkmark' /> Add
              </Button>

              <Button color='red' onClick={this.closeModal} inverted>
              <Icon name='remove'/> Cancel
              </Button>
            </Modal.Actions>
      </Modal>
      </React.Fragment>
    )
  }
}
