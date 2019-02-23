import './MovieModal.css'
import React, { Component } from 'react'
import MovieMainData from './MovieMainData';
import MovieCharacters from './MovieCharacters';
import axios from 'axios'

const initialState = {
    showMainData: true,
    showCharacters: false,
    characters: []
}

export default class MovieModal extends Component {
    constructor(props) {
        super(props);

        this.state = { ...initialState }

        this.showCharacters = this.showCharacters.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    showCharacters(charactersUrls) {
        let promises = charactersUrls.map(character => {
            return new Promise((resolve, reject) => {
                axios(character)
                    .then(resolve)
                    .catch(reject);
            })
        })

        Promise.all(promises).then((resp) => {
            let characters = resp.map((character) => {
                return {
                    name: character.data.name,
                    skin_color: character.data.skin_color
                }
            })

            this.setState({
                showCharacters: true,
                showMainData: false,
                characters
            })
        }).catch(() => {
            alert('Erros ao ler dados. Tente novamente.')
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
        let styles = this.props.modalVisible
            ? { display: "block" }
            : { display: "none" };
        //Só exibir voltar se estiver na segunda aba (Ver para adpatar pra mais abas)
        return (
            <div style={styles} className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.closeModal}>
                            <span>&times;</span>
                        </button>
                        <p className="modal-title">Detalhes do filme</p>
                    </div>

                    <div className="modal-body">
                        <button className="btn-voltar"onClick={this.resetState}>Voltar</button> 

                        <MovieMainData movie={this.props.movie} visible={this.state.showMainData} />
                        <MovieCharacters characters={this.state.characters} visible={this.state.showCharacters} />
                        
                        <a className="link" href="#" onClick={() => this.showCharacters(this.props.movie.characters)}>Atores</a>
                    </div>
                </div>
            </div>
        )
    }
}