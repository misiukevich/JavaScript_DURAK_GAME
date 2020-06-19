import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameWindow from "../src/components/game_window/game_window";
import * as serviceWorker from './serviceWorker';
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3000');


//GLOBAL SOCKETS
socket.on('comp should go', function() {socket.emit('comp may start');});
socket.on('human should go', function() {socket.emit('human may start');});

//INFORMATION FOR USER

socket.on('the end', () => alert('Игра окончена!') );
socket.on('do not lie', () => alert('Не жульничайте!') );
socket.on('You should go', () => alert('Вы должны походить!') );
socket.on('You may out', () => alert('Вы успешно отбились. ОТБОЙ!') );
socket.on('Could not answer', () => alert('У вас нет карт что бы отбиваться. Придется забирать.') );
socket.on('Can not go', () => alert('У вас нечего подкинуть. ОТБОЙ!') );
socket.on('Can not answer', () => alert('Вы не можете походить этой картой') );
socket.on('result1', () => alert('НИЧЬЯ!') );
socket.on('result2',(data) => alert(`Победа ${data.player}`));


ReactDOM.render(
    <GameWindow socket={socket} />,
    document.getElementById('root')
)


serviceWorker.unregister();
