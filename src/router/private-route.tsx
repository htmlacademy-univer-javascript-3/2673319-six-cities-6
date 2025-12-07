import {Navigate} from 'react-router-dom';
import React from 'react';
import {AppRoutes} from './app-routes.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {useAppSelector} from '../hooks/use-app-selector.ts';
import {getAuthorizationStatus} from '../store/user-process/selectors.ts';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({
  children,
}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoutes.Login}/>
  );
}
