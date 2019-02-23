import React from 'react'

export default props => {
    let styles = props.visible
        ? { display: "block" }
        : { display: "none" };

    return (
        <div style={styles}>
            <div className="detail">
                <label>Título</label>
                <div>{props.movie.title}</div>
            </div>

            <div className="detail-group">
                <div className="detail">
                    <label>Diretor</label>
                    <div>{props.movie.director}</div>
                </div>

                <div className="detail">
                    <label>Produtor</label>
                    <div>{props.movie.producer}</div>
                </div>
            </div>

            <div className="detail-group">
                <div className="detail">
                    <label>Data de lançamento</label>
                    <div>{new Date(props.movie.release_date).toLocaleDateString()}</div>
                </div>
            </div>

            <div className="detail">
                <label>Resumo</label>
                <div className="descricao">{props.movie.opening_crawl}</div>
            </div>
        </div>
    )
}