import React from 'react';
// import { Route, HashRouter, Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from '../components/header/index.js'
import Home from '../pages/Home';
import Detail from '../pages/Detail';

const router = () => (
  // 哈希路由，后面有#号
  // <HashRouter>
  //   <Switch>
  //     <Route path='/' exact component={Home} />
  //     <Route path='/detail' exact component={ Detail }/>
  //   </Switch>
  // </HashRouter>
  
  // H5history路由
  <BrowserRouter>
    <Header />
    <Route path='/' exact component={Home}></Route>
    <Route path='/detail' exact component={Detail}></Route>
  </BrowserRouter>
);

export default router