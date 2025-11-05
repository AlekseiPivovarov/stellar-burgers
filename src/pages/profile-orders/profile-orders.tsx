import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice';
import {
  getUserOrder,
  getUserOrders
} from '../../services/slices/userOrderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrder());
  }, []);
  const orders: TOrder[] = useSelector(getUserOrders).orders;
  return <ProfileOrdersUI orders={orders} />;
};
