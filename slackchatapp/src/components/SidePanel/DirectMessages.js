import React, { Component } from 'react';

import { connect } from 'react-redux';

import {setCurrrentChannel} from '../../action';
import {setPrivateChannel} from '../../action';


import {Menu, MenuItem, Icon} from 'semantic-ui-react'


import firebase from '../../FireBase';

class DirectMessages extends Component {

    state={
        users:[],
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('presence'),
        activeChannel: ''
    }
    

    componentDidMount(){
        if(this.state.user){
            this.addListeners(this.state.user.uid);
        }
    }

    addListeners = currentUserUid =>{
        let loadedUsers = []
        this.state.usersRef.on('child_added',snap => {
            if(currentUserUid !== snap.key){
                let user = snap.val();
                user['uid']= snap.key;
                user['status']= 'offline';
                loadedUsers.push(user);
                this.setState({users :loadedUsers});
            }
        })

        this.state.connectedRef.on('value', snap=>{
            if(snap.val() === true){
                const ref = this.state.presenceRef.child(currentUserUid) 
                ref.set(true)
                ref.onDisconnect().remove(err=>{
                    if(err !== null){
                        console.log(err)
                    }
                })
            }
        })

        this.state.presenceRef.on('child_added', snap=>{
            if(currentUserUid !== snap.key){
                this.addStatusToUser(snap.key);
            }
        })

        this.state.presenceRef.on('child_removed', snap=>{
            if(currentUserUid !== snap.key){
                this.addStatusToUser(snap.key, false);
            }
        })
    }

    addStatusToUser = (userId, connected = true)=>{
        const updatedUsers = this.state.users.reduce((acc,user)=> {
            if(user.uid === userId){
                user['status'] = `${connected ? 'online':'offline' }`;
            }
            return acc.concat(user)
        },[])

        this.setState({users: updatedUsers});

    }

    changeChannel = user =>{
        const channelId = this.getChannelId(user.uid)

        const channelData = {
            id: channelId,
            name: user.name
        }

        this.props.setCurrrentChannel(channelData);
        this.props.setPrivateChannel(true);
        this.setActiveChannel(user.uid)
    }

    setActiveChannel = uid =>{
        this.setState({activeChannel: uid})
    }

    getChannelId = id =>{
        const currentUserId = this.state.user.uid;
        return id < currentUserId ? 
        `${id}/${currentUserId}` :
        `${currentUserId}/${id}`

    }
  render() {
        const {users, activeChannel} = this.state;
    return (
        <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {users.map(user => (
          <Menu.Item
            key={user.uid}
            active={user.uid === activeChannel}
            onClick={() => this.changeChannel(user)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
          >
            <Icon
              name="circle"
              color={user['status']==='online' ? "green" : "red"}
            />
            @ {user.name}
          </Menu.Item>
        ))}
      </Menu.Menu>
    )
  }
}


export default connect(null,{setCurrrentChannel,setPrivateChannel})(DirectMessages);