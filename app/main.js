require('expose?$!expose?jQuery!jquery');
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './stores/index';
import actions from './actions/index';

location.hash = '';
window.addEventListener("hashchange", () => {
    var hash = location.hash;

    var regexp = /#?photo\/(.*)/g;
    if (regexp.test(hash)) {
        actions.showPhoto(hash.split('/')[1]);
    } else {
        actions.showPhoto(undefined);
    }
});

const app = document.getElementById('app');
const render = () => {
    ReactDOM.render(<App {...store.getState()}/>, app);
};

render();
store.subscribe(render);


