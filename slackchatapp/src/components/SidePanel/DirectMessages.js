import React, { Component } from 'react';

import { connect } from 'react-redux';

import {Menu, MenuItem, Icon} from 'semantic-ui-react'

import Firebase from '../../FireBase'

class DirectMessages extends Component {

    state={
        users:[]
    }
    
  render() {
        const {users} = this.state;
    return (
        <Menu.Menu className="menu">

            <MenuItem>
            <span>
                <Icon name='mail' /> DIRECT MESSAGES
            </span>{' '}
            ({users.length})
            </MenuItem>       
        
        </Menu.Menu>
    )
  }
}


export default DirectMessages;