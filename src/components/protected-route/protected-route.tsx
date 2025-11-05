import { Preloader } from '@ui';
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();

  if (state.loading) {
    return <Preloader />;
  }

  if (!state.authorization) {
    // Сохраняем текущий путь в state и делаем редирект
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // рендерим защищённый компонент
  return children;
};
