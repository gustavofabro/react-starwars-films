import './Main.css'
import React, { Component } from 'react'
import List from './List'
import MovieModal from './modal/MovieModal'

export default class Main extends Component {
    state = {
        modalVisible: false,
        movie: {}
    }

    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(movie) {
        this.setState({movie, modalVisible: true})
    }

    closeModal() {
        this.setState({ modalVisible: false })
    }

    render() {
        return (
            <article>
                <h1 className="title">Lista de filmes Star Wars</h1>
                <List openModal={this.openModal} />
                <MovieModal movie={this.state.movie} closeModal={this.closeModal} modalVisible={this.state.modalVisible} />
            </article>
        )
    }
}
