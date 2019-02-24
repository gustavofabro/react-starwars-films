import './MovieModal.css'
import React, { Component } from 'react'
import MovieMainData from './MovieMainData'
import MovieCharacters from './MovieCharacters'
import axios from 'axios'

const initialState = {
    showMainData: true,
    showCharacters: false,
    isLoading: false,
    characters: []
}

export default class MovieModal extends Component {
    constructor(props) {
        super(props)

        this.state = { ...initialState }

        this.showCharacters = this.showCharacters.bind(this)
        this.setTabMain = this.setTabMain.bind(this)
        this.resetState = this.resetState.bind(this)
    }

    showCharacters(charactersUrls) {
        if (this.state.characters.length) {
            this.setTabCharacters()
            return
        }

        this.setTabCharacters()

        this.setState({ isLoading: true })

        let promises = charactersUrls.map(character => {
            return new Promise((resolve, reject) => {
                axios(character)
                    .then(resolve)
                    .catch(reject)
            })
        })

        Promise.all(promises).then((resp) => {
            let characters = resp.map((character) => {
                return {
                    name: character.data.name,
                    skin_color: character.data.skin_color,
                    eye_color: character.data.eye_color,
                    mass: character.data.mass
                }
            })
            this.setState({ isLoading: false })
            this.setState({ characters })
        }).catch(() => {
            alert('Erros ao ler dados. Tente novamente.')
        })
    }

    setTabCharacters() {
        this.setState({
            showCharacters: true,
            showMainData: false
        })
    }

    setTabMain() {
        this.setState({
            showCharacters: false,
            showMainData: true
        })
    }

    resetState() {
        this.setState({ ...initialState })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalVisible) {
            this.resetState()
        }
    }

    render() {
        let styleModal = this.props.modalVisible ? { display: "block" } : { display: "none" }
        let characterSelected = this.state.showCharacters ? "selected" : ""
        let mainSelected = this.state.showCharacters ? "" : "selected"

        return (
            <div style={styleModal} className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.closeModal}>
                            <span>&times;</span>
                        </button>
                        <p className="ml-10">Detalhes do filme</p>
                    </div>

                    <div className="modal-body">
                        <MovieMainData movie={this.props.movie} visible={this.state.showMainData} />
                        <MovieCharacters characters={this.state.characters} visible={this.state.showCharacters} />
                    </div>

                    <div className="modal-footer">
                        <div className="modal-footer-content">
                            <button className={`btn-nav ${mainSelected}`} href="#" onClick={this.setTabMain}>Principal</button>
                            <button className={`btn-nav ml-10 ${characterSelected}`} href="#" onClick={() => this.showCharacters(this.props.movie.characters)}>Atores</button>
                            <i className={`fa fa-spinner fa-spin load-icon ${this.state.isLoading ? 'icon-visible' : 'icon-hidden'}`}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}