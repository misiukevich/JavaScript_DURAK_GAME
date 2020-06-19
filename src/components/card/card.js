import React, {Component} from 'react';
import './card.css'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <img alt='the card' onClick={(e) => this.props.handleClick(e)}
                 className='card' src={this.props.src} id={this.props.id}/>
        );
    }
}

export default Card;