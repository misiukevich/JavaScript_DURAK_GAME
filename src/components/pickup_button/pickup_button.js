import React, {Component} from 'react';
import './pickup_button.css'


class PickUpButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {

        }
    }

    //the handler of click on the button 'Забрать'
    handleClick() {
        this.props.socket.emit('pickUpButton');
    }

    render() {
        return (
            <button className='pickUpButton' onClick={() => this.handleClick()}>
                Забрать
            </button>
        );
    }
}

export default PickUpButton;