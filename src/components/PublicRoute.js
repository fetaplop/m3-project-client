import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './../lib/Auth';

function PublicRoute(props) {

  console.log('props :>> ', props);

  const { exact, path, component, isLoggedIn } = props;
  const Component = component;

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (isLoggedIn) return <Redirect to="/private" />
        else if (!isLoggedIn) return <Component {...props} />
      }} />
  )
}

export default withAuth(PublicRoute);
