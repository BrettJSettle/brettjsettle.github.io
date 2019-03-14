import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';

import * as serviceWorker from './serviceWorker';
import {HashRouter, Route, Link, Switch} from 'react-router-dom'

ReactDOM.render(
    <HashRouter>
        <div>
            <NavigationBar/>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <a href="https://teambabylon.github.io">Blog</a>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
            </ul>

            <hr />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/contact" component={Contact} />
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
