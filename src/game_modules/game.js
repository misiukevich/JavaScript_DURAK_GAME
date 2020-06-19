module.exports = class Game {
    constructor() {
        this.counter = 0;
        this.status = 'notStarted';
    }

    //computer's turn
    playComp(gameInstance, deckInstance, personInstance1, personInstance2,
             tableInstance, tableIdName, personIdName1, personIdName2, socket) {
        gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
        if (gameInstance.status === 'started') {
            if (gameInstance.counter % 2 === 0) {
                personInstance1.answerComp(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket);
                personInstance1.sortCards(deckInstance, personInstance1, tableIdName, personIdName1, socket);
                gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
            } else {
                if (tableInstance.tableCards.length === 0) {
                    personInstance1.goComp(tableInstance, tableIdName, personIdName1, socket);
                    personInstance1.sortCards(deckInstance, personInstance1, tableIdName, personIdName1, socket);
                    gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
                } else {
                    personInstance1.nextComp(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket);
                    personInstance1.sortCards(deckInstance, personInstance1, tableIdName, personIdName1, socket);
                    gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
                }
            }
        }
    }

    //human's turn
    playHuman(gameInstance, deckInstance, personInstance1, personInstance2,
              tableInstance, tableIdName, personIdName1, personIdName2, socket) {
        if (gameInstance.status === 'notStarted') {
            deckInstance.shuffle(deckInstance.cards, socket);
            deckInstance.deal(personInstance1, deckInstance, 'tableHtml', 'person1', socket);
            deckInstance.deal(personInstance2, deckInstance, 'tableHtml', 'person2', socket);
        }
        deckInstance.showTrumpCard(socket);
        personInstance1.sortCards(deckInstance, personInstance1, tableIdName, personIdName1, socket);
        personInstance2.sortCards(deckInstance, personInstance2, tableIdName, personIdName2, socket);
        gameInstance.status = 'started';
        gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
        if (gameInstance.status === 'started') {
            if (gameInstance.counter % 2 === 0) {
                if (tableInstance.tableCards.length === 0) {
                    personInstance2.goHuman(tableInstance, personInstance2, tableIdName, personIdName2, socket);
                    personInstance2.sortCards(deckInstance, personInstance2, tableIdName, personIdName2, socket);
                    gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
                } else {
                    personInstance2.nextHuman(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket);
                    personInstance2.sortCards(deckInstance, personInstance2, tableIdName, personIdName2, socket);
                    gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
                }
            } else {
                personInstance2.answerHuman(gameInstance, deckInstance, personInstance1, personInstance2, tableInstance, tableIdName, personIdName1, personIdName2, socket);
                personInstance2.sortCards(deckInstance, personInstance2, tableIdName, personIdName2, socket);
                gameInstance.giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket);
            }
        }
    }

    //display of the information
    giveInfo(deckInstance, tableInstance, personInstance1, personInstance2, socket) {
        if (this.counter % 2 !== 0) {
            socket.emit('giveInfo', { deckCardsLength: deckInstance.cards.length, name: personInstance1.name, discardLength: tableInstance.discard.length });
        } else {
            socket.emit('giveInfo', { deckCardsLength: deckInstance.cards.length, name: personInstance2.name, discardLength: tableInstance.discard.length });
        }
        if (deckInstance.cards.length === 0 && personInstance2.personCards.length === 0 && personInstance1.personCards.length === 0) {
            socket.emit('result1');
            this.status = 'finished';
        }
        if (deckInstance.cards.length === 0 && personInstance1.personCards.length === 0) {
            socket.emit('result2', {player: personInstance1.name});
            this.status = 'finished';
        } else if (deckInstance.cards.length === 0 && personInstance2.personCards.length === 0) {
            socket.emit('result2', {player: personInstance2.name});
            this.status = 'finished';
        }
    }
}
