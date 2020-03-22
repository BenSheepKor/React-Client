import React from 'react';

import Axios from 'axios'
import sha256 from 'js-sha256';

import { SERVER_API_IP } from '../../api/config'

import './SignUp.scss'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const initState =
{
    cantRegister: true,
    registerWasWrong: false,
    email: "",
    password: ""
}

class SignUp extends React.Component
{
    constructor ()
    {
        super();

        this.state = initState
    }

    componentDidMount()
    {
        document.addEventListener('keydown', this.handleKeyPress)
    }

    handleKeyPress = event =>
    {
        if (event.keyCode === 13) //enter key
        {
            if (!this.state.cantRegister)
            {
                this.sendRegisterRequest();
                this.setState({ registerWasWrong: false })
            }
            else // handle the case that he presses enter and cant login
                this.setState({ registerWasWrong: true })
        }
    }

    handleEmailChange = event =>
    {
        this.setState({ email: event.target.value });

        if (this.state.email !== "" && this.state.password !== "")
            this.setState({cantRegister: false})
        else
            this.setState({cantRegister: true})
    }

    handlePassChange = event =>
    {
        this.setState({ password: event.target.value });

        if (this.state.email !== "" && this.state.password !== "")
            this.setState({cantRegister: false})
        else
            this.setState({cantRegister: true})
    }

    sendRegisterRequest = async () =>
    {
        const password = sha256(this.state.password, this.state.password) // the hash of the password

        const signUpQuery = `mutation{register(email: "${this.state.email}", password: "${password}"){email, id}}`

        await Axios.post(SERVER_API_IP, {query: signUpQuery}).then(async res =>
        {
            console.log(res)

            if (res.status === 200 && res.data.id !== null)
            {
                const logInQuery = `mutation{login(email: "${this.state.email}", password: "${password}"){token}}`

                await Axios.post(SERVER_API_IP, {query: logInQuery}).then(async res =>
                {
                    console.log(res.data)
                })
            }
        })
    }

    render()
    {
        return(
            <div className="Register">
                <h1>Register</h1>

                <br></br>
                <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="your email" />
                <br></br>
                <input type="password" name="password" value={this.state.password} onChange={this.handlePassChange} placeholder="your password" />
                <br></br>

                <ButtonGroup>
                    <Button variant="primary" size="lg" disabled={this.state.cantRegister} onClick={this.sendRegisterRequest}>
                        Sign Up
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default SignUp