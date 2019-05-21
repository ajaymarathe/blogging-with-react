import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link to="/" className="navbar-brand">React Blog</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/create" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Create Post</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="Category">Pricing</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
         );
    }
}
 
export default Nav;