import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

const Main = () => (
   <main className="container">
     <App/>
   </main>
);

ReactDOM.render((
   <Main/>
), document.getElementById('root'));

registerServiceWorker();
