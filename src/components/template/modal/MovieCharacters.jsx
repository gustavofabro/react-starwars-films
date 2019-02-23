import React from 'react'

export default props => {
    let styles = props.visible
        ? { display: "block" }
        : { display: "none" };

    function renderRows() {
        return props.characters.map(character => {
            return (
                <tr key={character.name}>
                    <td>{character.name}</td>
                    <td>{character.skin_color}</td>
                </tr>
            )
        })
    }

    function renderTable() {
        return (
            <table className="table table-modal scroll">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cor da roupa</th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
        )
    }
    
    return (
        <div style={styles}>
            <div className="detail">
                <label>Atores do filme</label>
                {renderTable()}
            </div>
        </div>
    )
}