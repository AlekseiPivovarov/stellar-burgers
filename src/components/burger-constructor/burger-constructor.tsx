import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  setOrderRequest,
  setNullOrderModalData,
  sendOrder,
  getConstructorItem
} from '../../services/slices/burgerConstructorSlice';
import { getUserState } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorItem).constructorItems;
  const authorization = useSelector(getUserState).authorization;
  const orderRequest = useSelector((store) => store.constructorbg.orderRequest);
  const navigate = useNavigate();

  const orderModalData = useSelector(
    (store) => store.constructorbg.orderModalData
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!authorization) {
      navigate('/login');
      return;
    }
    if (constructorItems.bun) {
      dispatch(setOrderRequest(true));
      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId, ...ingredientsIds, bunId];
      dispatch(sendOrder(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(setNullOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
