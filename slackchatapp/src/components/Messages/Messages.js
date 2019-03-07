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
      user: this.props.currentUser,
      progressBar: false,
      numUniqueUsers: ''
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
        this.countUniqueUsers(loadedMessages);
      });
    };

    countUniqueUsers = (messages) => {
        const uniqueUsers = messages.reduce((acc,message)=> {
            if(!acc.includes(message.user.avatar)){
                acc.push(message.user.avatar)
            }
            return acc;
        },[])
        const plural =  uniqueUsers.length>1 || uniqueUsers.length === 0;
        const numUniqueUsers = `${uniqueUsers.length} user${plural? 's':''}`;
        this.setState({ numUniqueUsers: numUniqueUsers})
    }
  
    displayMessages = messages =>
      messages.length > 0 &&
      messages.map(message => (
        <Message
          key={message.timestamp}
          message={message}
          user={this.state.user}
        />
      ));

      isProgressBarVisible = percent =>{
          if( percent > 0){
              this.setState({progressBar: true});

          }
      }

      displayChannelName = channel => channel ? `${channel.name}` : '';
  
    render() {
      const { messagesRef, messages, channel, user, progressBar,numUniqueUsers } = this.state;
  
      return (
        <React.Fragment>
          <MessagesHeader 
          channelName = {this.displayChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
          />
  
          <Segment>
            <Comment.Group className={progressBar ? 'messages_progress':'messages'}>
              {this.displayMessages(messages)}
            </Comment.Group>
          </Segment>
  
          <MessageForm
            messagesRef={messagesRef}
            currentChannel={channel}
            currentUser={user}
            isProgressBarVisible={this.isProgressBarVisible}
          />
        </React.Fragment>
      );
    }
  }
  
  export default Messages;
  