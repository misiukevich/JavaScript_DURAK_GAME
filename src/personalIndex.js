import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import openSocket from 'socket.io-client';
import PersonalWindow from "./components/personal_window/personal_window";
const socket = openSocket('http://localhost:3000');


ReactDOM.render(
    <PersonalWindow socket={socket} />,
    document.getElementById('root')
)

serviceWorker.unregister();