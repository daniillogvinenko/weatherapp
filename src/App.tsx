import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppContainer from './components/AppContainer/AppContainer';
import './index.css'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <AppContainer />
      </div>
    </Provider>
  );
}

export default App;
