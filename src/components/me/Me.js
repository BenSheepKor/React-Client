import React, { Component } from 'react'

import Axios from 'axios'

import { SERVER_API_IP } from '../../api/config'

import './Me.scss'

const initState =
{
    token: ""
}

export default class Me extends Component
{
    constructor()
    {
        super();

        this.state = initState
    }

    async componentWillMount ()
    {
        // this.setState({token: storedToken})
        const options = `{ headers: { Authorization: Bearer ${this.state.token} }}`

        await Axios.get(SERVER_API_IP, options).then(res =>
        {
            console.log(res)
        })
    }
    
    render()
    {
        return (
            <div>
                
            </div>
        )
    }
}
