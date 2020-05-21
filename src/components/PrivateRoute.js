import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../lib/Auth';

function PrivateRoute(props) {
  console.log('props :>> ', props);

  const { exact, path, component, isLoggedIn } = props;
  const Component = component;

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (isLoggedIn) return <Component {...props} />
        else if (!isLoggedIn) return <Redirect to="/login" />
      }} />
  )
}

export default withAuth(PrivateRoute);
