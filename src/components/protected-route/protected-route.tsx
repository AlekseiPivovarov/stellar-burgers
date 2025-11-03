import { Preloader } from '@ui';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  getAuthorization,
  getUser,
  getUserState
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const state = useSelector(getUserState);
  console.log(state.authorization);

  if (state.loading) {
    return <Preloader />;
  }

  if (!state.authorization) {
    return <Navigate replace to='/login' />;
  }
  // рендерим защищённый компонент
  return children;
};
