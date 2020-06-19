import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import openSocket from 'socket.io-client';
import EditWindow from "./components/editWindow/editWindow";
const socket = openSocket('http://localhost:3000');


ReactDOM.render(
    <EditWindow socket={socket} />,
    document.getElementById('root')
)

serviceWorker.unregister();