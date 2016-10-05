import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import App from 'components/App';

function NoMatch(props) {
  return (
    <h1>Page not found.</h1>
  )
}
function AppRouter(props) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}></Route>
      <Route path="/:id" component={App}></Route>
      <Route path="*" component={NoMatch}></Route>
    </Router>
  );
}

export default AppRouter;
