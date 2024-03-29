'use client';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../store/store';
// import { setupListeners } from '@reduxjs/toolkit/query';

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);
  console.log('storeRef: ', storeRef.current);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

/* Этот компонент будет отображаться только один раз для каждого запроса на сервере, но может быть повторно отображен на клиенте несколько раз, если над этим компонентом в дереве расположены клиентские компоненты с отслеживанием состояния, или если этот компонент также содержит другое изменяемое состояние, которое вызывает pererender. */

/* Любой компонент, который взаимодействует с хранилищем Redux (создает его, предоставляет, читает из него или записывает в него), должен быть клиентским компонентом. Это связано с тем, что для доступа к хранилищу требуется контекст React, а контекст доступен только в клиентских компонентах. */
