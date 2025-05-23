import { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { CustomizationProps } from '../types';

export const useConfig = (): CustomizationProps => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
