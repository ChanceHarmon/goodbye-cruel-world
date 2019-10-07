import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './store';

const store = createStore();

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<Main />, root);
