import { useContext } from 'react';
import { ToastContext } from '../components/ToastProvider';
import { ToastContextValue } from '../types';

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};