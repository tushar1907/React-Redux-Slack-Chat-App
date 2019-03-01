import React from 'react';
import { Segment, Comment, MessageHeader} from 'semantic-ui-react';
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';
import firebase from '../../FireBase';
import { connect } from 'react-redux';

class Messages extends React.Component{

    state = {
        messageRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user:  this.props.currentUser
    }
    render(){
        const {messageRef, channel, user} =  this.state
        return(
            <React.Fragment>
                <MessagesHeader/>
                <Segment>
                    <Comment.Group className='messages'>
                    
                    </Comment.Group>
                </Segment>

                <MessageForm
                messageRef={messageRef} channel={channel} user={user}/>
            </React.Fragment>
        )
    }
}

export default Messages;