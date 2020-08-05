import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import AppMain from './components/AppMain';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import { loadUser } from './actions/authActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  
  return (
    <Provider store={store}>
          <BrowserRouter>
          <AppNavbar />
          <AppMain />
          <ItemModal />
          </BrowserRouter>
    </Provider>
  );
}

export default App;
