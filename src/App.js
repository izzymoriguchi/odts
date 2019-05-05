// SJSU CS 218 Spring 2019 TEAM4
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateTracking from "./components/create-tracking.component";
import TrackPackage from "./components/track-package.component";


class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">ODTS</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/add" className="nav-link">Create package</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={TrackPackage} />
                <Route path="/add" component={CreateTracking} />
            </div>
        </Router>
    );
  }
}

export default App;
