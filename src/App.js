import React from 'react';
import { GlobalStyle } from './style.js'
import { IconFontStyle } from './static/iconfont/iconfont'
import { Provider } from 'react-redux'
import Router from './router/index.js'
import store from './store/index'

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <GlobalStyle />
        <IconFontStyle />
        <Router />
        {/* <BrowserRouter>
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail' exact component={Detail}></Route>
        </BrowserRouter> */}
      </div>
    </Provider>
  );
}

export default App;
