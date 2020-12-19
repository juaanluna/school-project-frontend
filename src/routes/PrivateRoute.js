import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.usuarios);

  return (
    <Route {...rest} render={props => (
      auth.isAuth
        ? <Component {...props} />
        : <Redirect to="/auth" />
    )} />
  )
}