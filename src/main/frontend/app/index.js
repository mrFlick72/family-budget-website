import React from 'react';
import ReactDOM from 'react-dom';
import SpentBudgetApp from "./SpentBudgetApp";
import {resetSearchParameters} from "./SearchCriteriaOnUrl";

resetSearchParameters()

if(document.getElementById('app')){
    ReactDOM.render(<SpentBudgetApp />, document.getElementById('app'));
}