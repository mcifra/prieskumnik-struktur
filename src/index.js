import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Plan from './components/Plan';
import Diary from './components/Diary';
import {Route, HashRouter, Switch} from 'react-router-dom';

const Main = () => (
    <main className="container">
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/plan" component={Plan}/>
            <Route path="/diary" component={Diary}/>
            <Route path="/contact" component={Contact}/>
        </Switch>
    </main>
);

const App = () => (
    <div>
        <Navigation/>
        <Main/>
    </div>
);

ReactDOM.render((
    <HashRouter>
        <App/>
    </HashRouter>
), document.getElementById('root'));

registerServiceWorker();
