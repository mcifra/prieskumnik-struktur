import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Contact from './components/Contact';
import Plan from './components/Plan';
import Diary from './components/Diary';
import References from './components/References';
import {Route, HashRouter, Switch} from 'react-router-dom';

const Main = () => (
    <main className="container">
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/plan" component={Plan}/>
            <Route path="/diary" component={Diary}/>
            <Route path="/references" component={References}/>
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
