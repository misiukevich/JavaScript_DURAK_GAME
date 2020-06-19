const common = require('./common');
module.exports = class Person extends common {
    constructor(name) {
        super();
        this.name = name;
        this.personCards = [];
        this.answerCards = [];
    }

    //method 'Put down the first card' on the table for human
    goHuman(tableInstance, personInstance, tableIdName, personIdName, socket) {
        console.log('работает гоу хьюман');
    }

    //method 'Put down the next card' on the table for human
    nextHuman(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket) {
        console.log('работает некст хьюман');
        if (personInstance1.personCards.length === 0) {
            this.out(tableInstance, tableIdName, socket);
            gameInstance.counter += 1;
            personInstance2.takeCard(deckInstance, personInstance2, tableIdName, personIdName2, socket);
            personInstance1.takeCard(deckInstance, personInstance1, tableIdName, personIdName1, socket);
            socket.emit('comp should go');
        } else {
            let arrNext = [];
            for (let i = 0; i < personInstance2.personCards.length; i++) {
                if (tableInstance.tableValues.indexOf(personInstance2.personCards[i].value) !== (-1)) {
                    arrNext.push(personInstance2.personCards[i]);
                }
            }
            if (personInstance2.personCards.length === 0 || arrNext.length === 0) {
                socket.emit('Can not go');
                personInstance2.out(tableInstance, tableIdName, socket);
                gameInstance.counter += 1;
                personInstance2.takeCard(deckInstance, personInstance2, tableIdName, personIdName2, socket);
                personInstance1.takeCard(deckInstance, personInstance1, tableIdName, personIdName1, socket);
                socket.emit('comp should go');
            }
        }
    }

    //method 'Put down the answer card' on the table for human
    answerHuman(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket) {
        console.log('работает ансвер хьюман');
        this.answerCards.splice(0, this.answerCards.length);
        let simpleCards = [];
        let trumpCards = [];
        let x = tableInstance.tableCards[tableInstance.tableCards.length - 1];
        for (let i = 0; i < this.personCards.length; i++) {
            if (x.suit === deckInstance.trump.suit) {
                if (this.personCards[i].suit === x.suit && this.personCards[i].rank > x.rank) {
                    trumpCards.push(this.personCards[i]);
                }
            } else {
                if (this.personCards[i].suit === x.suit && this.personCards[i].rank > x.rank) {
                    simpleCards.push(this.personCards[i]);
                } else if (this.personCards[i].suit === deckInstance.trump.suit) {
                    trumpCards.push(this.personCards[i]);
                }
            }
        }
        this.sortArr(trumpCards);
        this.sortArr(simpleCards);
        this.answerCards = trumpCards.concat(simpleCards);
        if (this.answerCards.length === 0) {
            socket.emit('Could not answer');
            this.pickUp(tableInstance, deckInstance, personInstance2, tableIdName, personIdName2, socket);
            personInstance1.takeCard(deckInstance, personInstance1, tableIdName, personIdName1, socket);
            personInstance2.takeCard(deckInstance, personInstance2, tableIdName, personIdName2, socket);
            socket.emit('comp should go');
        }
    }
}