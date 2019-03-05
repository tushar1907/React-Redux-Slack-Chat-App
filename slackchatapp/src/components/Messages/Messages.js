import React from 'react';
import { Segment, Comment, MessageHeader} from 'semantic-ui-react';
import MessageForm from './MessageForm';
import Message from './Message';
import MessagesHeader from './MessagesHeader';
import firebase from '../../FireBase';

import FileModal from './FileModal';

class Messages extends React.Component {
    state = {
      messagesRef: firebase.database().ref("messages"),
      messages: [],
      messagesLoading: true,
      channel: this.props.currentChannel,
      user: this.props.currentUser
    };
  
    componentDidMount() {
      const { channel, user } = this.state;
  
      if (channel && user) {
        this.addListeners(channel.id);
      }
    }
  
    addListeners = channelId => {
      this.addMessageListener(channelId);
    };
  
    addMessageListener = channelId => {
      let loadedMessages = [];
      this.state.messagesRef.child(channelId).on("child_added", snap => {
        loadedMessages.push(snap.val());
        this.setState({
          messages: loadedMessages,
          messagesLoading: false
        });
      });
    };
  
    displayMessages = messages =>
      messages.length > 0 &&
      messages.map(message => (
        <Message
          key={message.timestamp}
          message={message}
          user={this.state.user}
        />
      ));

      idProgressBarVisible = percen
  
    render() {
      const { messagesRef, messages, channel, user } = this.state;
  
      return (
        <React.Fragment>
          <MessagesHeader />
  
          <Segment>
            <Comment.Group className={progressBar ? 'messages_progress':'messages'}>
              {this.displayMessages(messages)}
            </Comment.Group>
          </Segment>
  
          <MessageForm
            messagesRef={messagesRef}
            currentChannel={channel}
            currentUser={user}
          />
        </React.Fragment>
      );
    }
  }
  
  export default Messages;
  