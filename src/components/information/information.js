import React, {Component} from 'react';
import './information.css'


class Information extends React.Component {
    constructor(props) {
        super(props);
        this.showInformation = this.showInformation.bind(this);
        this.state = {
            deckCardsLength: null,
            discardLength: null,
            name: null
        }
    }

    componentDidMount() {
        this.props.socket.on('giveInfo', (data) => {this.showInformation(data)});
    }

    showInformation(data) {
        this.setState({
            deckCardsLength: data.deckCardsLength,
            discardLength: data.discardLength,
            name: data.name
        });
    }

    render() {
        return (
            <div className='information'>
                <p>Карт в колоде: {this.state.deckCardsLength}</p>
                <p>Ходит игрок: {this.state.name}</p>
                <p>Карт в отбое: {this.state.discardLength}</p>
            </div>
        );
    }
}

export default Information;