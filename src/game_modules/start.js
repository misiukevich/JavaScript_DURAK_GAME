const cardModule = require('./card');
const compModule = require('./comp');
const deckModule = require('./deck');
const gameModule = require('./game');
const personModule = require('./person');
const tableModule = require('./table');

//card's value
const value = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
//suit
const suit = ["hearts", "diamonds", "spades", "clubs"];
//card's rank
const rank = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//card's images
const image = [
    'pic/six_of_hearts.jpg', 'pic/six_of_diamonds.jpg', 'pic/six_of_spades.jpg', 'pic/six_of_clubs.jpg',
    'pic/seven_of_hearts.jpg', 'pic/seven_of_diamonds.jpg', 'pic/seven_of_spades.jpg', 'pic/seven_of_clubs.jpg',
    'pic/eight_of_hearts.jpg', 'pic/eight_of_diamonds.jpg', 'pic/eight_of_spades.jpg', 'pic/eight_of_clubs.jpg',
    'pic/nine_of_hearts.jpg', 'pic/nine_of_diamonds.jpg', 'pic/nine_of_spades.jpg', 'pic/nine_of_clubs.jpg',
    'pic/ten_of_hearts.jpg', 'pic/ten_of_diamonds.jpg', 'pic/ten_of_spades.jpg', 'pic/ten_of_clubs.jpg',
    'pic/jack_of_hearts.jpg', 'pic/jack_of_diamonds.jpg', 'pic/jack_of_spades.jpg', 'pic/jack_of_clubs.jpg',
    'pic/queen_of_hearts.jpg', 'pic/queen_of_diamonds.jpg', 'pic/queen_of_spades.jpg', 'pic/queen_of_clubs.jpg',
    'pic/king_of_hearts.jpg', 'pic/king_of_diamonds.jpg', 'pic/king_of_spades.jpg', 'pic/king_of_clubs.jpg',
    'pic/ace_of_hearts.jpg', 'pic/ace_of_diamonds.jpg', 'pic/ace_of_spades.jpg', 'pic/ace_of_clubs.jpg'
];

//generate the deck of cards
const arr_1 = [];

for (let i = 0, val = 0, sui = 0; i < 36; i++) {
    if (i % 4 === 0 && i !== 0) {
        val += 1;
    }
    if (i % 4 === 0) {
        sui = 0;
    } else {
        sui += 1;
    }
    arr_1[i] = new cardModule(value[val], suit[sui], rank[val], image[i], i);
}

module.exports.deck = new deckModule(arr_1);
module.exports.table = new tableModule();
module.exports.person1 = new compModule('Computer');
module.exports.person2 = new personModule('Petya');
module.exports.game = new gameModule();