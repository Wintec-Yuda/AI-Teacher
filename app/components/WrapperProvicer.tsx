'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../lib/redux/store';

interface WrapperProviderProps {
  children: ReactNode;
}

const WrapperProvider: React.FC<WrapperProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default WrapperProvider;
