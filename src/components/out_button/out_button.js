import React, {Component} from 'react';
import './out_button.css'


class OutButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {

        }
    }
    //the handler of click on the button 'Отбой'
    handleClick() {
        this.props.socket.emit('outButton');
    }

    render() {
        return (
            <button className='outButton' onClick={() => this.handleClick()}>
                Отбой
            </button>
        );
    }
}

export default OutButton;