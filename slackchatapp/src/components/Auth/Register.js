import React from 'react';

import { Grid, From, Segment, Button, Header, Message, Icon, Form } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import firebase from '../../FireBase'

import md5 from 'md5';

class Register extends React.Component{
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        userRef: firebase.database().ref('users')
    }

    isFormValid = () =>{
        let errors = [];
        let error;


        if(this.isFormEmpty(this.state)){
            error = {message: 'Fill in all fields'}
            this.setState({errors: errors.concat(error)})
            return false;
        }else if(!this.isPasswordValid(this.state)){
             error = {message: 'Password is invalid'}
             this.setState({errors: errors.concat(error)})
             return false;
        }else{
            return true;
        }
    }

    isPasswordValid = ({password, passwordConfirmation}) => {
        if(password.length < 6 || passwordConfirmation < 6){
            return false;
        }else if(password !== passwordConfirmation){
            return false;
        }else{
            return true;
        }
    }

    isFormEmpty = ({username, email, password, passwordConfirmation }) =>{
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)
    handleChange = event =>{
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event =>{
        if(this.isFormValid()){
            this.setState({errors:[], loading: true})     
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) =>{
                console.log(user)
                user.updateProfile({
                            displayName: this.state.username,
                            photoURL: `http://gravatar.com/avatar/${md5(user.email)}?d=identicon`
                    }).then(()=>{
                        this.saveUser(user).then(()=>{
                            console.log('user saved');
                        })
                        this.setState({loading: false, username: '',
                        email: '',
                        password: '',
                        passwordConfirmation: ''})
                        })
                        .catch( err =>{
                            console.log(err)
                            this.setState({errors: this.state.errors.concat(err), loading: false})
                        }) 
                
            }, function(err) {
                console.error(err); 
                this.setState({errors: this.state.errors.concat(err), loading: false})
            });
        }        
    }

    saveUser = createdUser =>{
        return this.state.userRef.child(createdUser.uid).set({
            name: createdUser.displayName,
            avatar: createdUser.photoURL,
        })
    }


    handleInputError(errors, inputName){

       return errors.some(error => 
        error.message.toLowerCase().includes(inputName)
        ) 
        ? 'error' 
        :''

    }
    render(){
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return(
            <Grid textAlign='center' verticalAlign='middle' className="app">
                <Grid.Column style={{ maxWidth:500 }}>
                    <Header as='h2' icon color='blue' textAlign='center'>
                        <Icon name='tasks' color='blue' />
                        USER REGISTRATION
                    </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>

                            <Form.Input fluid name='username' icon='user' iconPosition='left' placeholder='Username' 
                            onChange={this.handleChange} type='text' value={username}
                            className={this.handleInputError(errors, 'username')}/>  
                            
                            <Form.Input fluid name='email' icon='mail' iconPosition='left' placeholder='Email' 
                            onChange={this.handleChange} type='email' value={email}
                            className={this.handleInputError(errors, 'email')}/>  

                            <Form.Input fluid name='password' icon='lock' iconPosition='left' placeholder='Password' 
                            onChange={this.handleChange} type='password' value={password}
                            className={this.handleInputError(errors, 'password')}/>  

                            <Form.Input fluid name='passwordConfirmation' icon='repeat' iconPosition='left' placeholder='Password Confirmation' 
                            onChange={this.handleChange} type='password' value={passwordConfirmation}
                            className={this.handleInputError(errors, 'password')}/>  

                            <Button disabled={loading} className={loading ? 'loading':''} color='blue' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                        <h3>
                            Error
                        </h3>
                        {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user?<Link to='/login'> Login here </Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;