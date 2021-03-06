import './List.css'
import React, { Component } from 'react'
import axios from 'axios'
import shortid from 'shortid'

const baseUrlMovie = 'https://swapi.co/api/films/'

export default class List extends Component {
    state = {
        list: [],
        modalVisible: false
    }
 
    componentWillMount() {
        axios(baseUrlMovie).then(resp => {
            this.setState({ list: resp.data.results })
        }).catch(() => {
            alert('Erros ao ler dados. Tente novamente')
        })
    } 

    load(movie) {
        this.props.openModal(movie)
    }

    renderTable() {
        return (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Filmes</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map (movie => {
            return (
                <tr onDoubleClick={() => this.load(movie)} key={shortid.generate()}>
                    <td>{movie.title}</td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <div className="container">
                {this.renderTable()}
            </div>
        )
    }
}
