import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Plan from './components/Plan';
import References from './components/References';
import App from './components/app/App';
import {HashRouter, Route, Switch} from 'react-router-dom';

const Main = () => (
   <main className="container">
     <Switch>
       <Route exact path='/' component={Home}/>
       <Route path="/plan" component={Plan}/>
       <Route path="/references" component={References}/>
       <Route path="/app" component={App}/>
     </Switch>
   </main>
);

const MainApp = () => (
   <div>
     <Navigation/>
     <Main/>
   </div>
);

ReactDOM.render((
   <HashRouter>
     <MainApp/>
   </HashRouter>
), document.getElementById('root'));

registerServiceWorker();
