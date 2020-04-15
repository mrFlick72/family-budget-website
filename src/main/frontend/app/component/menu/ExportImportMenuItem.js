import React from "react";
import SingleMenuItem from "./SingleMenuItem";

export default ({
                    downloadLink,
                    downloadStentBudgetAsFileUseCasePdfHandler,
                    downloadStentBudgetAsFileUseCaseXlsxHandler
                }) => {
    return <li className="nav-item dropdown active">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
           role="button" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-exchange-alt fa-lg"></i>Export
        </a>
        <div className="dropdown-menu">
            <a className="hide" ref={downloadLink} href="#"/>
            <SingleMenuItem key='pdf'
                            menuItemLabel='Export To Pdf'
                            menuItemPrefixIcon={<i className="fas fa-download fa-lg"></i>}
                            onClickHandler={downloadStentBudgetAsFileUseCasePdfHandler}/>

            <SingleMenuItem key='xlsx'
                            menuItemLabel='Export To Excel'
                            menuItemPrefixIcon={<i className="fas fa-download fa-lg"></i>}
                            onClickHandler={downloadStentBudgetAsFileUseCaseXlsxHandler}/>
        </div>
    </li>
}