import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';


class MessagesHeader extends React.Component{
    render(){
        const { channelName,numUniqueUsers, handleSearchChange, searchLoading } = this.props 
        return(
            <Segment clearing>

                <Header fluid='true' as='h2' floated='left' style={{ marginBottom:0 }}>
                    <span>
                        Channel : {channelName} 
                        <Icon name={'star outline'} color='black' />
                    </span>
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>


                <Header floated='right'>
                    <Input
                     loading={searchLoading}
                     onChange={handleSearchChange}
                     size='mini' icon='search' name='searhTerm' placeholder='Search Messages' />                    
                    
                </Header>
            </Segment>
        )
    }
}

export default MessagesHeader;