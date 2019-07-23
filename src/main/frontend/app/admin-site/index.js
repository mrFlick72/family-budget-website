import React from 'react';
import ReactDOM from 'react-dom';
import AdminApp from "./AdminApp";

if(document.getElementById('app')){
    ReactDOM.render(<AdminApp />, document.getElementById('app'));
}