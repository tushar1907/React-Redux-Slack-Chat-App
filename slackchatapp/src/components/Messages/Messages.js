import React from 'react';
import { Segment, Comment, MessageHeader} from 'semantic-ui-react';
import MessageForm from './MessageForm';
import Message from './Message';
import MessagesHeader from './MessagesHeader';
import firebase from '../../FireBase';
import { connect } from 'react-redux';

class Messages extends React.Component{

    state = {
        messageRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user:  this.props.currentUser,
        messages: [],
        messagesLoading: true
    }

    componentDidMount() {
        const { channel, user} = this.state;

        if(channel && user){
            this.addListeners(channel.id);
        }
    }

    addListeners = channelId =>{
        this.addMessageListeners(channelId);
    }

    addMessageListeners = channelId =>{
        let loadedMessage = [];
        this.state.messageRef.child(channelId).on('child_added', snap => {
            loadedMessage.push(snap.val());
            
        })
        this.setState({messages: loadedMessage});
    }

    displayMessages = messages =>{
        messages.length > 0 &&
        messages.map(message => (
            <Message 
            key={message.timestamp}
            message={message}
            user={this.state.user}/>
          ));
    }

    render(){
        const {messageRef, messages, channel, user} =  this.state
        return(
            <React.Fragment>
                <MessagesHeader/>
                <Segment>
                    <Comment.Group className='messages'>
                        {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>

                <MessageForm
                messageRef={messageRef} channel={channel} user={user}/>
            </React.Fragment>
        )
    }
}

export default Messages;