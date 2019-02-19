import React, { Component } from 'react';

import { connect } from 'react-redux';

import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react'

import Firebase from '../../FireBase'

class UserPanel extends Component {

    state = {
        user: this.props.currentUser
    }    


    dropDownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        { 
            key: 'avatar',
            text: <span>Change avatar</span>,

        },
        {
            key: 'signOut',
            text: <span onClick={this.handleSignout}>Sign Out</span>,

        }
    ]
        
    handleSignout = () =>{
        Firebase
        .auth()
        .signOut()
        .then(() => console.log('signed out'))
    }
    
  render() {
    const {user} = this.state;
    return (
      <Grid style={{ background: '#4c3c4c'}}>
        <Grid.Column>
            <Grid.Row style={{ padding: '1.2em', margin: 0}}>
                {/* App Header */}
                <Header inverted float='left' as='h2'>
                <Icon/>
                    <Header.Content>DevChat</Header.Content>
                </Header>

                <Header style={{padding: '0.25em' }} as='h4' inverted>
                    <Dropdown 
                        trigger=
                        {<span>
                            <Image source={user.photoURL} spaced='right' avatar/>
                        {user.displayName}
                        </span>} 
                        options={this.dropDownOptions()}/>
                </Header>
            </Grid.Row>

            

        </Grid.Column>
      </Grid>
    )
  }
}


export default UserPanel;