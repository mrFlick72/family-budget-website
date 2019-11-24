import React from "react"

export default ({links, messages, children}) => (
    <div className="container-fluid" style={{"margin-bottom":"15px"}}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBar"
                    aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navBar">
                <a className="navbar-brand" href={links.home}>{messages.title}</a>
                {children}
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/account/site/index.html">
                            <i className="fas fa-user fa-lg"></i> {messages.userProfileLabel}
                        </a>
                    </li>
                </ul>
                <form action={links.logOut} method="GET">
                    <button type="submit" className="btn btn-secondary"> {messages.logOutLabel}
                        <i className="fas fa-sign-out-alt fs-lg"></i></button>
                </form>
            </div>
        </nav>
    </div>
);