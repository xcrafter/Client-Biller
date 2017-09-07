import React, { Component} from 'react';

export default class Clear extends Component
{
    componentDidMount()
    {
        localStorage.clear();

    }
    render()
    {
        return(
            <div></div>
        );
    }
}