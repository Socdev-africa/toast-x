import { useContext } from 'react';
import { ToastContext } from '../components/ToastProvider';
import { ToastContextValue, ToastOptions } from '../types';

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

export const usePromiseToast = () => {
  const toast = useToast();
  
  const promiseToast = async <T,>(
    promise: Promise<T>,
    messages: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((error: any) => React.ReactNode);
    },
    options?: Omit<ToastOptions, 'type'>
  ): Promise<T> => {
    const toastId = toast.loading(messages.loading, options);
    
    try {
      const data = await promise;
      
      toast.update(toastId, {
        type: 'success',
        content: typeof messages.success === 'function' 
          ? messages.success(data) 
          : messages.success,
        duration: options?.duration ?? 5000,
      });
      
      return data;
    } catch (error) {
      toast.update(toastId, {
        type: 'error',
        content: typeof messages.error === 'function' 
          ? messages.error(error) 
          : messages.error,
        duration: options?.duration ?? 5000,
      });
      
      throw error;
    }
  };
  
  return { ...toast, promiseToast };
};

export default useToast;