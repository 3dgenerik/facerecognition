import React, { Component } from 'react';
import Tilt from 'react-parallax-tilt';


class SignIn extends Component  {
    constructor(props){
        super(props)
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
        //bind to avoid 'TypeError: Cannot read property 'setState' of undefined'
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
    }

    onEmailChange = (event) => {
        this.setState({signInEmail:event.target.value});
    }
    
    onPasswordChange = (event) => {
        this.setState({signInPassword:event.target.value});
    }

        onSubmitSignIn = () => {
        const {signInEmail, signInPassword} = this.state;
        fetch('http://localhost:4000/signin', {
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:signInEmail,
                password:signInPassword
            })
        }).then(res => res.json()).then(data => {
            if (data[0] === "Success"){
                this.props.laodUser(data[1]);
                this.props.routeChange('home')
            }else{
                console.log(data);
            }
        });      
    }


    render() {
        const {routeChange} = this.props;
        return(
            <Tilt className = 'w-30 center' perspective={1000} tiltReverse={true} tiltMaxAngleX={6} tiltMaxAngleY={6} style = {{transformStyle: 'preserve-3d'}}>
    
                <article className="br2 ba b--white-20 shadow-2 mv5 w-100 center bg-white-0 jox">
    
                    <main className="pa4 black-80"  style = {{transform: 'translateZ(50px)'}}>
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3 pa3" >
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        onChange = {this.onEmailChange}
                                        className="pa3 input-reset ba bg-white hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                    />
                                </div>
                                <div className="mv3 pa3 " >
                                    <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                                    <input  
                                        onChange = {this.onPasswordChange}
                                        className="b pa3 input-reset ba bg-white hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                                    type="submit"
                                    value="Sign in"
                                    onClick = {this.onSubmitSignIn}
                                />
                            </div>
                            <div className="lh-copy mt3 pointer">
                                <p
                                    onClick = {() => routeChange('register')}
                                    className="f6 link dim black db">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </Tilt>
        )
    }
}

export default SignIn;