import React, { Component } from 'react'
import { Menu, MenuItem, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../FireBase';

export default class Channels extends Component {

    state = {
        user: this.props.currentUser,
        channels: [],
        modal: false,
        channelName: '',
        channelDetails: '',
        channelRef: firebase.database().ref('channels')
    }
    

    closeModal=()=> this.setState({modal: false});

    openModal=()=> this.setState({modal: true});

    handleChange = (event) =>{      
      this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event =>{
      event.preventDefault();     
      if(this.isFormValid(this.state)){
        
        this.addChannel();
      }
    }

    addChannel = () =>{
      const {channelRef, channelName, channelDetails, user} = this.state;

      const key = channelRef.push().key;
     
      const newChannel = {
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy:{
          name: user.displayName,
          avatar: user.photoURL
        }
      };

        channelRef  
          .child(key)
          .update(newChannel)
          .then(()=>{
            this.setState({channelDetails:'', channelName:''})
            this.closeModal();
            console.log('channel added')
          })
          .catch(err=>{
            console.error(err)
          })


      } 


    


    isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;


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
              <Form onSubmit={this.handleSubmit}>

                <Form.Field>
                  <Input fluid label="Name of Channel" name='channelName' onChange={this.handleChange}/>
                </Form.Field>

                <Form.Field>
                  <Input fluid label="About the Channel" name='channelDetails' onChange={this.handleChange}/>
                </Form.Field>

              </Form>
            </Modal.Content>

            <Modal.Actions>
              <Button color='green' onClick={this.handleSubmit} inverted>
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
