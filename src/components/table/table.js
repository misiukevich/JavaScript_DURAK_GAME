import React, {Component} from 'react';
import './table.css'
import Card from "../card/card";


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.putPersonCardOnTable = this.putPersonCardOnTable.bind(this);
        this.clearTable = this.clearTable.bind(this);
        this.putCompCardOnTable = this.putCompCardOnTable.bind(this);
        this.state = {
            listWithCards: []
        }
    }

    componentDidMount() {
        this.props.socket.on('goHuman', (data) => {this.putPersonCardOnTable(data)});
        this.props.socket.on('nextHuman', (data) => {this.putPersonCardOnTable(data)});
        this.props.socket.on('answerHuman', (data) => {this.putPersonCardOnTable(data)});
        this.props.socket.on('out', (data) => {this.clearTable(data)});
        this.props.socket.on('goComp', (data) => {this.putCompCardOnTable(data)});
        this.props.socket.on('nextComp', (data) => {this.putCompCardOnTable(data)});
        this.props.socket.on('answerComp', (data) => {this.putCompCardOnTable(data)});
    }

    //the handler which put the human's card on the table
    putPersonCardOnTable(data) {
        let newCard = <Card src={data.cardPic} id={data.cardNum}/>;
        this.setState(prevState => ({
            listWithCards: [...prevState.listWithCards, newCard]
        }));
        this.props.socket.emit('comp may start');
    }

    //the handler which put the computer's card on the table
    putCompCardOnTable(data) {
        let newCard = <Card src={data.cardPic} id={data.cardNum}/>;
        this.setState(prevState => ({
            listWithCards: [...prevState.listWithCards, newCard]
        }));

        this.props.socket.emit('human may start');
    }

    //method to clear the table
    clearTable(data) {
        let tab = document.getElementById(data.tableIdName);
        for (let i = tab.childNodes.length - 1; i >= 0; i--) {
            tab.childNodes[i].remove();
        }
    }

    render() {
        return (
            <div className='table' id="tableHtml">
                {this.state.listWithCards}
            </div>
        );
    }
}

export default Table;