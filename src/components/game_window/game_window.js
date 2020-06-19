import React, {Component} from 'react';
import FirstPerson from "../person1/person1";
import SecondPerson from "../person2/person2";
import Table from "../table/table";
import TrumpCard from "../trump_card/trump_card";
import Information from "../information/information";
import PickUpButton from "../pickup_button/pickup_button";
import OutButton from "../out_button/out_button";
import './game_window.css'
import Card from "../card/card";
import Avatar1 from "../avatar1/avatar1";
import Avatar2 from "../avatar2/avatar2";
import PersonalButton from "../personalButton/personalButton";





class GameWindow extends React.Component {
    constructor(props) {
        super(props);
        this.showSortedCards1 = this.showSortedCards1.bind(this);
        this.showSortedCards2 = this.showSortedCards2.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            listWithCardsForPerson1: [],
            listWithCardsForPerson2: [],
            avatar1: [],
            avatar2: [],
            id: ''
        }
    }

    componentDidMount() {
        this.props.socket.on('sort1', (data) => {this.showSortedCards1(data)});
        this.props.socket.on('sort2', (data) => {this.showSortedCards2(data)});
        this.props.socket.on('avatar1', (data) => { this.setState({avatar1: [data.user1, data.pic1]});});
        this.props.socket.on('avatar2', (data) => { this.setState({avatar2: [data.user2, data.pic2]});});
    }

    //the handler of computer's cards after sorting
    showSortedCards1(data) {
        let cardsData = [];
        for (let i = 0; i < data.cardPics.length; i++) {
            cardsData.push({src: data.cardPics[i], id: data.cardNums[i]});
        }
        let newElements = cardsData.map(card => <Card src={card.src} id={card.id}/>);
        this.setState({
            listWithCardsForPerson1: newElements
        });
    }

    //the handler of click on the human's card
    handleClick(e) {
        let id = e.target.id;
        this.props.socket.emit('goHuman', {id: id});
    }

    //the handler of human's cards after sorting
    showSortedCards2(data) {
        let cardsData = [];
        for (let i = 0; i < data.cardPics.length; i++) {
            cardsData.push({src: data.cardPics[i], id: data.cardNums[i]});
        }
        let newElements = cardsData.map(card => <Card src={card.src} id={card.id} handleClick={this.handleClick}/>);
        this.setState({
            listWithCardsForPerson2: newElements
        });
    }

    render() {
        return (
            <div className='gameWindow'>
                <FirstPerson socket={this.props.socket} cards={this.state.listWithCardsForPerson1}/>
                <SecondPerson socket={this.props.socket} cards={this.state.listWithCardsForPerson2} handleClick={this.handleClick}/>
                <Table socket={this.props.socket}/>
                <TrumpCard socket={this.props.socket}/>
                <Information socket={this.props.socket}/>
                <PickUpButton socket={this.props.socket}/>
                <OutButton socket={this.props.socket}/>
                <Avatar1 data={this.state.avatar1}/>
                <Avatar2 data={this.state.avatar2}/>
                <PersonalButton/>
            </div>
        );
    }
}

export default GameWindow;