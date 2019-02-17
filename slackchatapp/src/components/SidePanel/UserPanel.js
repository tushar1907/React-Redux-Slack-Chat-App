import React, { Component } from 'react';

import {Grid, Header, Icon, Dropdown} from 'semantic-ui-react'

import Firebase from '../../FireBase'

export default class UserPanel extends Component {

    dropDownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>User</strong></span>,
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
    return (
      <Grid style={{ background: '#4c3c4c'}}>
        <Grid.Column>
            <Grid.Row style={{ padding: '1.2em', margin: 0}}>
                {/* App Header */}
                <Header inverted float='left' as='h2'>
                <Icon/>
                    <Header.Content>  DevChat</Header.Content>
                </Header>
            </Grid.Row>

            <Header style={{padding: '0.25em' }} as='h4' inverted>
            <Dropdown 
                trigger={<span>User</span>} 
                options={this.dropDownOptions()}/>
            </Header>

        </Grid.Column>
      </Grid>
    )
  }
}
