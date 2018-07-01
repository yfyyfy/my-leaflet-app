import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const MOUNT_NODE = document.getElementById('root')

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE);
  registerServiceWorker();
}

render();

if (module.hot) {
  module.hot.accept(['./App'], () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    }),
  );
}
