import React, { Component } from 'react'
import { Menu, MenuItem, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../FireBase';
import { connect } from 'react-redux';
import { setCurrrentChannel } from '../../action'

class Channels extends React.Component {

    state = {
        user: this.props.currentUser,
        channels: [],
        modal: false,
        channelName: '',
        channelDetails: '',
        channelRef: firebase.database().ref('channels'),
        firstLoad: true,
        activeChannel: ''
    }
    
    componentDidMount() {
      this.addListeners();
    }

    componentWillUnmount(){
      this.removeListeners();
    }

    removeListeners = () =>{
      this.state.channelRef.off();
    }
    addListeners = () =>{
      let loadedChannels = [];
      this.state.channelRef.on('child_added', snap => {
        loadedChannels.push(snap.val())        
        this.setState({channels: loadedChannels});
        this.setFirstChannel()
      })
    }

    setFirstChannel = () => {
      const firstChannel = this.state.channels[0];
      if(this.state.firstLoad && this.state.channels.length > 0){
        this.props.setCurrrentChannel(firstChannel)
        this.state.activeChannel = firstChannel.id
      }
      this.setState({firstLoad: false})
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

    changeChannel = channel =>{
      this.setActiveChannel(channel);
      this.props.setCurrrentChannel(channel)
    }
      
    setActiveChannel = channel => {
      this.setState({ activeChannel: channel.id});
    }

    displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={ channel.id === this.state.activeChannel }
      >
        # {channel.name}
      </Menu.Item>
    ));


    isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;


  render() {
    const {channels,modal} = this.state;
    return (
      <React.Fragment>
      <Menu.Menu className="menu">

          <MenuItem>
            <span>
                <Icon name='exchange' /> CHANNELS
            </span>
            ({channels.length}) <Icon name='add' onClick={this.openModal}/>
          </MenuItem>

          {this.displayChannels(channels)}
          
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


export default connect(null, {setCurrrentChannel})(Channels)