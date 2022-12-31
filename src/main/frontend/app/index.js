import React from 'react';
import ReactDOM from 'react-dom';
import SpentBudgetApp from "./SpentBudgetApp";

if(document.getElementById('app')){
    ReactDOM.render(<SpentBudgetApp />, document.getElementById('app'));
}