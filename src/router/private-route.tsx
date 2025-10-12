import {Navigate} from 'react-router-dom';
import React from 'react';
import {AppRoutes} from './app-routes.ts';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export default function PrivateRoute({
  isAuthenticated,
  children,
}: PrivateRouteProps) {
  return (
    isAuthenticated ? children : <Navigate to={AppRoutes.Login}/>
  );
}
