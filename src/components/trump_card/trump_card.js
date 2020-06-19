import React, {Component} from 'react';
import './trump_card.css'
import Card from "../card/card";


class TrumpCard extends React.Component {
    constructor(props) {
        super(props);
        this.showTrumpCard = this.showTrumpCard.bind(this);
        this.state = {
            src: null,
            id: null
        }
    }

    componentDidMount() {
        this.props.socket.on('showTrump', (data) => {this.showTrumpCard(data)});
    }

    showTrumpCard(data) {
        this.setState({
            src: data.src,
            id: data.id
        });
    }

    render() {
        return (
            <div className='trumpCard'>
                <p>КОЗЫРНАЯ КАРТА</p>
                <Card src={this.state.src} id={this.state.id} />
            </div>
        );
    }
}

export default TrumpCard;