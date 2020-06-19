module.exports = class Deck {
    constructor(cards) {
        this.cards = cards;
        this.trump = 0;
    }

    //to deal cards for players at the start of the game
    deal(personInstance, deckInstance, tableIdName, personIdName, socket) {
        for (let i = 0; personInstance.personCards.length < 6; i++) {
            personInstance.personCards.push(this.cards.pop());
        }
        personInstance.sortCards(deckInstance, personInstance, tableIdName, personIdName, socket);
    }

    //to shuffle the cards
    shuffle(arr, socket) {
        let j, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        this.trump = this.cards[0];
        socket.emit('showTrump', {src: this.trump.image, id: this.trump.num});
    }

    //display of the trump card
    showTrumpCard(socket) {
        socket.emit('showTrump', {src: this.trump.image, id: this.trump.num});
    }
}