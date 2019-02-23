import React, { Component } from 'react'

export default class MovieRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.list.title}</td>
            </tr>
        );
    }
}