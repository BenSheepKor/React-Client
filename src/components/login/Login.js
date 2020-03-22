import React from 'react';

import Axios from 'axios'
import sha256 from 'js-sha256';

import { SERVER_API_IP } from '../../api/config'

import './Login.scss'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const initState =
{
    cred: "",
    password: "",
    isEmail: false,
    cantLogin: true,
    loginWasWrong: false
}

class Login extends React.Component
{
    constructor()
    {
        super();

        this.state = initState;
    }

    componentDidMount()
    {
        document.addEventListener('keydown', this.handleKeyPress)
    }

    handleKeyPress = event =>
    {
        if (event.keyCode === 13) //enter key
        {
            if (!this.state.cantLogin)
            {
                this.sendLoginRequest();
                this.setState({ loginWasWrong: false })
            }
            else // handle the case that he presses enter and cant login
                this.setState({ loginWasWrong: true })
        }
    }

    handleCredChange = event =>
    {
        this.setState({ cred: event.target.value });

        // Check if both password and email/username are filled
        if (this.state.cred !== "" && this.state.password !== "")
            this.setState({cantLogin: false})
        else
            this.setState({cantLogin: true})
    };

    handlePassChange = event =>
    {
        this.setState({ password: event.target.value });

        // Check if both password and email/username are filled
        if (this.state.cred !== "" && this.state.password !== "")
            this.setState({cantLogin: false})
        else
            this.setState({cantLogin: true})
    };

    sendLoginRequest = async () =>
    {
        // Check if the user is using his e-mail or his username
        if (this.state.cred.indexOf('@') !== -1 && this.state.cred.indexOf('.') !== -1)
            this.setState({isEmail : true})

        const password = sha256(this.state.password, this.state.password) // the hash of the password

        let query = ""

        if (this.state.isEmail)
        {
            query = `mutation{login(email: "${this.state.cred}", password: "${password}"){token}}`
        }
        else
        {
            query = `mutation{login(username: "${this.state.cred}", password: "${password}"){token}}`
        }

        await Axios.post(SERVER_API_IP, {query: query}).then(res =>
        {
            console.log(res.data)
        })
    }

    render()
    {
        return(
            <div className="Login">
                <h1>Login</h1>

                <br></br>
                <input type="text" name="username or email" value={this.state.cred} onChange={this.handleCredChange} placeholder="your username or email" />
                <br></br>
                <input type="password" name="password" value={this.state.password} onChange={this.handlePassChange} placeholder="your password" />
                <br></br>

                <ButtonGroup>
                    <Button variant="primary" size="lg" disabled={this.state.cantLogin} onClick={this.sendLoginRequest}>
                        Login
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default Login
