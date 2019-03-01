import React from 'react';
import { Segment, Button, Input} from 'semantic-ui-react';
import firebase from '../../FireBase';

class MessageForm extends React.Component{

    state={
        message:'',
        loading: false,
        channel: this.props.channel,
        user: this.props.user,
        errors:[]
    }

    handleChange = event =>{
        this.setState({ [event.target.name] : event.target.value })        
    }

    sendMessage = () =>{
        const {messageRef} = this.props;
        const {message,channel} = this.state;
        if(message){
            this.setState({ loading: true})
            messageRef
            .child(channel.id)
            .push()
            .set(this.createMessage())
            .then(()=>{
                this.setState({loading: false, message:'', errors:[]})
            })
            .catch(err=>{
                console.log(err)
                this.setState({loading: false, errors: this.state.errors.concat(err)})
            })
        } else{            
            this.setState({errors: this.state.errors.concat({message: "Add a message"})})            
        }
    }

    createMessage = () =>{
        const message= {
            content: this.state.message,
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            }
        };

        return message;
    }
    render(){
        const {errors} = this.state
        return(
            <Segment className='message__form'>
                <Input 
                fluid
                name='message'
                style={{ marginBottom: '0.7em'}}
                label={<Button icon='add'/>}
                labelPosition='left'
                placeholder="Write your message"
                onChange={this.handleChange}
                className={
                    errors.some(error => error.message.includes('message')) ? 'error':''
                }
                />
                <Button.Group icon widths='3'>
                    <Button color='blue' content='Add Reply' labelPosition='left' icon='edit' onClick={this.sendMessage}/>
                    <Button color='teal' content='Upload Media' labelPosition='right' icon='cloud upload'/>
                </Button.Group>
            </Segment>
        )
    }
}

export default MessageForm;