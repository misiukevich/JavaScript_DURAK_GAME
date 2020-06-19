//Import the main module of application
const startModule = require('./src/game_modules/start');

//Imports to create a server
let express = require("express");
let path = require("path");
let app = express();
let http = require('http').createServer(app);

//Import for sockets
let io = require('socket.io')(http);
//Import for uploading user's data
const multer  = require('multer');

//Import for working with database(Postgres)
const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres", "joe", "123456789", {
    dialect: "postgres"
});


//Table "user" in DataBase
const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    telefonNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Synchronization with DataBase
sequelize.sync().then(result=>{
    console.log(result);
})
    .catch(err=> console.log(err));


//File Save Options
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    },
    encoding: 'jpg'
})
const upload = multer({ storage: storage })


//HTTP methods
app.use(express.static(path.join( __dirname + '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/registration", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/user_views/registration.html"));
});

app.get("/personal", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/user_views/personal.html"));
});

app.get("/edit", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/user_views/edit.html"));
});

app.post('/edit', upload.single('myFile'), function (req, res) {
    const getFile = req.file;
    const getText = req.body;
    try {
        if (getFile) {
            User.update({
                name: getText.userName,
                age: getText.userAge,
                telefonNumber: getText.userNumber,
                avatar: getFile.filename
            }, {
                where: {
                    id: 1
                }
            }).then((res) => {
                console.log(res);
            });
        } else {
            User.update({
                name: getText.userName,
                age: getText.userAge,
                telefonNumber: getText.userNumber,
            }, {
                where: {
                    id: 1
                }
            }).then((res) => {
                console.log(res);
            });
        }
    } catch (error) {
        return res
            .status(400)
            .json({
                message: error.message
            })
    }
    return res
        .redirect('/');
});

app.post('/registration', upload.single('myFile'), function (req, res) {
    const getFile = req.file;
    const getText = req.body;
    try {
        User.create({
            name: getText.userName,
            age: getText.userAge,
            telefonNumber: getText.userNumber,
            avatar: getFile.filename
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    } catch (error) {
        return res
            .status(400)
            .json({
                message: error.message
            })
    }
    return res
        .redirect('/');
});


//Socket connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // Get information about users from database
    User.findOne({where: {name: "Computer"}})
        .then(user=>{
            if(!user) return;
            let user1 = user.name;
            let pic1 = 'uploads/' +  user.avatar;
            startModule.person1.name = user.name;
            socket.emit('avatar1', {user1: user1, pic1: pic1});
        }).catch(err=>console.log(err));

    User.findByPk(1)
        .then(user=>{
            if(!user) return;
            let user2 = user.name;
            let pic2 = 'uploads/' + user.avatar;
            let id2 = user.id;
            let age2 = user.age;
            let telNumber2 = user.telefonNumber;
            startModule.person2.name = user.name;
            socket.emit('avatar2', {user2: user2, pic2: pic2});
            socket.emit('for personal', {user: user2, age: age2, pic: pic2, id: id2, telNumber: telNumber2});
        }).catch(err=>console.log(err));

    //Start the game
    startModule.game.giveInfo(startModule.deck, startModule.table, startModule.person1, startModule.person2, socket);
    startModule.game.playHuman(startModule.game, startModule.deck, startModule.person1, startModule.person2, startModule.table, 'tableHtml', 'person1', 'person2', socket);

    socket.on('goHuman', function(data) {checkTheGoCard(data)});
    socket.on('outButton', function() {pressOutButton()});
    socket.on('pickUpButton', function() {pressPickUpButton()});
    socket.on('comp may start', function() {startPlayComp()});
    socket.on('human may start', function() {startPlayHuman()});

    //for checking person clicked card (method goHuman, nextHuman, answerHuman  of class Person)
    function checkTheGoCard(data) {
        if (startModule.game.counter % 2 === 0) {
            if (startModule.table.tableCards.length === 0) {
                for (let i = 0; i < startModule.person2.personCards.length; i++) {
                    if (startModule.person2.personCards[i].num == data.id) {
                        startModule.table.tableCards.push(startModule.person2.personCards[i]);
                        startModule.table.tableValues.push(startModule.person2.personCards[i].value);
                        socket.emit('goHuman', {
                            tableIdName: 'tableHtml', cardPic: startModule.person2.personCards[i].image,
                            cardNum: startModule.person2.personCards[i].num, i: i, cardShirt: startModule.person2.personCards[i].shirt
                        });
                        startModule.person2.personCards.splice(i, 1);
                    }
                }
            } else {
                for (let i = 0; i < startModule.person2.personCards.length; i++) {
                    if (startModule.person2.personCards[i].num == data.id) {
                        if (startModule.table.tableValues.indexOf(startModule.person2.personCards[i].value) !== (-1)) {
                            startModule.table.tableCards.push(startModule.person2.personCards[i]);
                            startModule.table.tableValues.push(startModule.person2.personCards[i].value);
                            socket.emit( 'nextHuman', { tableIdName: 'tableHtml', cardPic: startModule.person2.personCards[i].image,
                                cardNum: startModule.person2.personCards[i].num, i: i, cardShirt: startModule.person2.personCards[i].shirt} );
                            startModule.person2.personCards.splice(i, 1);
                        } else {
                            socket.emit('Can not answer');
                            socket.emit('human should go');
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < startModule.person2.personCards.length; i++) {
                if (startModule.person2.personCards[i].num == data.id) {
                    if (startModule.person2.answerCards.indexOf(startModule.person2.personCards[i]) !== (-1)) {
                        startModule.table.tableCards.push(startModule.person2.personCards[i]);
                        startModule.table.tableValues.push(startModule.person2.personCards[i].value);
                        socket.emit('answerHuman', {tableIdName: 'tableHtml', cardPic: startModule.person2.personCards[i].image,
                            cardNum: startModule.person2.personCards[i].num, i: i, cardShirt: startModule.person2.personCards[i].shirt});
                        startModule.person2.personCards.splice(i, 1);
                    } else {
                        socket.emit('Can not answer');
                        socket.emit('human should go');
                    }
                }
            }
        }
    }

    //The handler which starts when the button 'Отбой' is clicked
    function pressOutButton() {
        if (startModule.game.counter % 2 === 0) {
            if (startModule.table.tableCards.length === 0) {
                socket.emit('You should go');
            } else {
                startModule.person2.out(startModule.table, 'tableHtml', socket);
                startModule.person1.takeCard(startModule.deck, startModule.person1, 'tableHtml', 'person1', socket);
                startModule.person2.takeCard(startModule.deck, startModule.person2, 'tableHtml', 'person2', socket);
                startModule.game.counter += 1;
                startModule.game.giveInfo(startModule.deck, startModule.table, startModule.person1, startModule.person2, socket);
                socket.emit('comp should go');
            }
        } else {
            socket.emit('do not lie');
        }
        if (startModule.deck.cards.length === 0 && (startModule.person2.personCards.length === 0 || startModule.person1.personCards.length === 0)) {
            socket.emit('the end');
        }
    }

    //The handler which starts when the button 'Забрать' is clicked
    function pressPickUpButton() {
        if (startModule.game.counter % 2 === 0) {
            if (startModule.table.tableCards.length === 0) {
                socket.emit('You should go');
            } else {
                socket.emit('do not lie');
            }
        } else {
            startModule.person2.pickUp(startModule.table, startModule.deck, startModule.person2, 'tableHtml', 'person2', socket);
            startModule.person1.takeCard(startModule.deck, startModule.person1, 'tableHtml', 'person1', socket);
            startModule.person2.takeCard(startModule.deck, startModule.person2, 'tableHtml', 'person2', socket);
            socket.emit('comp should go');
        }
        if (startModule.deck.cards.length === 0 && (startModule.person2.personCards.length === 0 || startModule.person1.personCards.length === 0)) {
            socket.emit('the end');
        }
        startModule.game.giveInfo(startModule.deck, startModule.table, startModule.person1, startModule.person2, socket);
    }

    //the function which starts method playComp of class Game
    function startPlayComp() {
        startModule.game.playComp(startModule.game, startModule.deck, startModule.person1, startModule.person2, startModule.table, 'tableHtml', 'person1', 'person2', socket);
    }

    //the function which starts method playHuman of class Game
    function startPlayHuman() {
        startModule.game.playHuman(startModule.game, startModule.deck, startModule.person1, startModule.person2, startModule.table, 'tableHtml', 'person1', 'person2', socket);
    }
});

http.listen(3000, () => {
    console.log("Running at Port 3000");
});