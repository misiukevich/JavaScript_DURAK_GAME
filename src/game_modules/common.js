module.exports = class {
    constructor() {
    }

    //sorting of the array in descending order
    sortArr(arr) {
        arr.sort( function(a,b) {
            if (a.rank > b.rank) {
                return -1;
            }
            if (a.rank < b.rank) {
                return 1;
            }
            return 0;
        });
    }

    //method 'Sorting' for cards
    sortCards(deckInstance, personInstance, tableIdName, personIdName, socket) {
        let simpleCards = [];
        let trumpCards = [];
        for (let i = 0; i < this.personCards.length; i++) {
            if (this.personCards[i].suit === deckInstance.trump.suit) {
                trumpCards.push(this.personCards[i]);
            } else {
                simpleCards.push(this.personCards[i]);
            }
        }
        if (trumpCards.length > 0) {
            this.sortArr(trumpCards);
        }
        if (simpleCards.length > 0) {
            this.sortArr(simpleCards);
        }
        this.personCards.splice(0, this.personCards.length);
        this.personCards = trumpCards.concat(simpleCards);
        if (personIdName === 'person1') {
            let imagesForSocket = [];
            let numForSocket = [];
            for (let i = 0; i < this.personCards.length; i++) {
                imagesForSocket.push(this.personCards[i].shirt);
                numForSocket.push(this.personCards[i].num);
            }
            socket.emit('sort1', {
                deckInstance: deckInstance, tableIdName: tableIdName,
                personIdName: personIdName, cardPics: imagesForSocket,
                cardNums: numForSocket
            });
            imagesForSocket.splice(0, imagesForSocket.length);
            numForSocket.splice(0, numForSocket.length);
        } else {
            let imagesForSocket = [];
            let numForSocket = [];
            for (let i = 0; i < this.personCards.length; i++) {
                imagesForSocket.push(this.personCards[i].image);
                numForSocket.push(this.personCards[i].num);
            }
            socket.emit('sort2', {
                deckInstance: deckInstance, tableIdName: tableIdName,
                personIdName: personIdName, cardPics: imagesForSocket,
                cardNums: numForSocket
            });
            imagesForSocket.splice(0, imagesForSocket.length);
            numForSocket.splice(0, numForSocket.length);
        }
    }

    //method to put table's cards to the discard pile
    out(tableInstance, tableIdName, socket) {
        for (let i = 0; i < tableInstance.tableCards.length; i++) {
            tableInstance.discard.push( tableInstance.tableCards[i] );
        }
        tableInstance.tableCards.splice(0, tableInstance.tableCards.length);
        tableInstance.tableValues.splice(0, tableInstance.tableValues.length);
        socket.emit('out', {tableIdName: tableIdName});
    }

    //method to put table's cards for the person
    pickUp(tableInstance, deckInstance, personInstance, tableIdName, personIdName, socket) {
        for (let i = 0; i < tableInstance.tableCards.length; i++) {
            personInstance.personCards.push( tableInstance.tableCards[i] );
        }
        tableInstance.tableCards.splice(0, tableInstance.tableCards.length);
        tableInstance.tableValues.splice(0, tableInstance.tableValues.length);
        socket.emit('out', {tableIdName: tableIdName} );
        personInstance.sortCards(deckInstance, personInstance, tableIdName, personIdName, socket);
    }

    //method to take card from the deck
    takeCard(deckInstance, personInstance, tableIdName, personIdName, socket) {
        let i = personInstance.personCards.length;
        while (i < 6) {
            if (deckInstance.cards.length > 0) {
                personInstance.personCards.push(deckInstance.cards.pop());
                i += 1;
            } else {
                break;
            }
        }
        personInstance.sortCards(deckInstance, personInstance, tableIdName, personIdName, socket);
    }
}