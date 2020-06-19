const common = require('./common');
module.exports = class Comp extends common {
    constructor(name) {
        super();
        this.name = name;
        this.personCards = [];
    }

    //method 'Put down the first card' on the table for computer
    goComp(tableInstance, tableIdName, personIdName, socket) {
        console.log('работает гоу комп');
        let i = this.personCards.length - 1;
        let x = this.personCards.pop();
        tableInstance.tableCards.push(x);
        tableInstance.tableValues.push(x.value);
        socket.emit('goComp', {tableIdName: tableIdName, personIdName: personIdName, cardPic: x.image,
            cardNum: x.num,  i: i} );
    }

    //method 'Put down the next card' on the table for computer
    nextComp(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket) {
        console.log('работает некст комп');
        if (personInstance2.personCards.length === 0) {
            socket.emit('You may out');
            this.out(tableInstance, tableIdName, socket);
            gameInstance.counter += 1;
            personInstance1.takeCard(deckInstance, personInstance1, tableIdName, personIdName1, socket);
            personInstance2.takeCard(deckInstance, personInstance2, tableIdName, personIdName2, socket);
            socket.emit('human should go');
        } else {
            let i = personInstance1.personCards.length - 1;
            while (i >= 0) {
                if (tableInstance.tableValues.indexOf(personInstance1.personCards[i].value) !== (-1)) {
                    let x = personInstance1.personCards[i];
                    tableInstance.tableCards.push(x);
                    tableInstance.tableValues.push(x.value);
                    socket.emit('nextComp', {
                        tableIdName: tableIdName, personIdName: personIdName1, cardPic: x.image,
                        cardNum: x.num, i: i
                    });
                    personInstance1.personCards.splice(i, 1);
                    break;
                } else {
                    i -= 1;
                }
            }
            if (i === -1) {
                personInstance1.out(tableInstance, tableIdName, socket);
                gameInstance.counter += 1;
                personInstance1.takeCard(deckInstance, personInstance1, tableIdName, personIdName1, socket);
                personInstance2.takeCard(deckInstance, personInstance2, tableIdName, personIdName2, socket);
                // socket.emit('human should go');
                gameInstance.playHuman(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, 'tableHtml', 'person1', 'person2', socket);

            }
        }
    }

    //method 'Put down the answer card' on the table for computer
    answerComp(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket) {
        console.log('работает ансвер комп');
        let answerCards = [];
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
        answerCards = trumpCards.concat(simpleCards);
        if (answerCards.length === 0) {
            this.pickUp(tableInstance, deckInstance, personInstance1, tableIdName, personIdName1, socket);
            personInstance2.takeCard(deckInstance, personInstance2, tableIdName, personIdName2, socket);
            personInstance1.takeCard(deckInstance, personInstance1, tableIdName, personIdName1, socket);
            gameInstance.playHuman(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, 'tableHtml', 'person1', 'person2', socket);
        } else {
            let x = answerCards.pop();
            tableInstance.tableCards.push(x);
            tableInstance.tableValues.push(x.value);
            let i = this.personCards.indexOf(x);
            socket.emit('answerComp', { tableIdName: tableIdName, personIdName: personIdName1, cardPic: x.image,
                cardNum: x.num, i: i });
            this.personCards.splice(i, 1);
        }
    }
}