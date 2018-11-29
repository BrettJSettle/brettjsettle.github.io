import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './components/About';
import NotFound from './components/NotFound'
import * as serviceWorker from './serviceWorker';
import {HashRouter, Route, Link, Switch} from 'react-router-dom'

ReactDOM.render(
    <HashRouter>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>

            <hr />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </HashRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
