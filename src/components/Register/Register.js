import React, { Component } from 'react';
import Tilt from 'react-parallax-tilt';


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            registerName: '',
            registerEmail:'',
            registerPassword:''
        }

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        
    }

    onNameChanged = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmailChanged = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChanged = (event) => {
        this.setState({registerPassword: event.target.value})
    }
    
    onSubmitRegister = () => {
        const {registerName, registerEmail, registerPassword} = this.state;
        if(registerName && registerEmail && registerPassword){
            fetch(`${this.props.port}/register`, { 
                method: 'post', 
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:registerName,
                    email:registerEmail,
                    password:registerPassword
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.name === 'error'){
                    console.log('User already exists');
                }else{
                    this.props.laodUser(data);
                    this.props.routeChange('home');

                }
            })
        }else{
            console.log('Please fill a fields.')
        }

    }

    render (){
        const {routeChange} = this.props;
        return(
            <Tilt className = 'w-30 center' perspective={1000} tiltReverse={true} tiltMaxAngleX={6} tiltMaxAngleY={6} style = {{transformStyle: 'preserve-3d'}}>
    
                <article className="br2 ba b--white-20 shadow-2 mv5 w-100 center bg-white-0 jox">
    
                    <main className="pa4 black-80"  style = {{transform: 'translateZ(70px)'}}>
                        <div className="measure center">
                            <fieldset id="register" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3 pa3" >
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input
                                        onChange = {this.onNameChanged}
                                        className="pa3 input-reset ba bg-white hover-bg-black hover-white w-100"
                                        type="text"
                                        name="name" 
                                        id="name"
                                    />
                                </div>
                                <div className="mt3 pa3" >
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                        onChange = {this.onEmailChanged}
                                        className="pa3 input-reset ba bg-white hover-bg-black hover-white w-100" 
                                        type="email"
                                        name="email-address" 
                                        id="email-address-reg"  
                                    />
                                </div>
                                <div className="mv3 pa3 " >
                                    <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                                    <input 
                                        onChange = {this.onPasswordChanged}
                                        className="b pa3 input-reset ba bg-white hover-bg-black hover-white w-100" 
                                        type="password"
                                        name="password" 
                                        id="password-reg"
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                                    type="submit"
                                    value="Register"
                                    onClick = {this.onSubmitRegister}
                                />
                            </div>
                            <div className="lh-copy mt3 pointer">
                                <p
                                    onClick = {() => routeChange('signin')}
                                    className="f6 link dim black db">Sign in</p>
                            </div>
    
                        </div>
                    </main>
                </article>
            </Tilt>
        )
    }
}

export default Register;