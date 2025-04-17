// src/types/index.ts
import { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading' | 'custom';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastAnimationType = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip';

export interface ToastOptions {
  /**
   * Toast type - determines the appearance of the toast
   * @default 'info'
   */
  type?: ToastType;
  
  /**
   * Duration in milliseconds before the toast is automatically closed
   * Set to false to disable auto closing
   * @default 5000
   */
  duration?: number | false;
  
  /**
   * Position of the toast on the screen
   * @default 'top-right'
   */
  position?: ToastPosition;
  
  /**
   * Animation type for the toast entrance/exit
   * @default 'slide'
   */
  animation?: ToastAnimationType;
  
  /**
   * Whether the toast is dismissible by clicking
   * @default true
   */
  dismissible?: boolean;
  
  /**
   * Whether to display a progress bar showing the remaining time
   * @default false
   */
  progressBar?: boolean;
  
  /**
   * Custom action button configuration
   */
  action?: {
    label: string;
    onClick: () => void;
    theme?: 'primary' | 'secondary' | 'danger';
  };
  
  /**
   * Whether to pause the timer when the toast is hovered
   * @default true
   */
  pauseOnHover?: boolean;
  
  /**
   * Custom CSS class names to apply to the toast
   */
  className?: string;
  
  /**
   * Play sound when the toast appears
   * @default false
   */
  sound?: boolean | string;
  
  /**
   * Unique ID for the toast (auto-generated if not provided)
   */
  id?: string;
  
  /**
   * Use rich content rendering (supports markdown or JSX)
   * @default false
   */
  richContent?: boolean;
  
  /**
   * Group identifier to categorize related toasts
   */
  group?: string;
  
  /**
   * Priority level (higher priority toasts will show first)
   * @default 0
   */
  priority?: number;

  /**
   * Custom z-index for the toast
   */
  zIndex?: number;
  
  /**
   * Callback triggered when the toast is closed
   */
  onClose?: () => void;
}

export interface Toast {
  id: string;
  content: ReactNode;
  type: ToastType;
  duration: number | false;
  position: ToastPosition;
  animation: ToastAnimationType;
  dismissible: boolean;
  progressBar: boolean;
  pauseOnHover: boolean;
  className: string;
  sound: boolean | string;
  richContent: boolean;
  group: string | undefined;
  priority: number;
  zIndex: number | undefined;
  createdAt: number;
  visible: boolean;
  action?: ToastOptions['action'];
  onClose?: () => void;
}

export interface ToastContextValue {
  toasts: Toast[];
  toast: (content: ReactNode, options?: ToastOptions) => string;
  success: (content: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  error: (content: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  info: (content: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  warning: (content: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  loading: (content: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  custom: (content: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  update: (id: string, options: Partial<ToastOptions> & { content?: ReactNode }) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  isActive: (id: string) => boolean;
  pause: (id: string) => void;
  resume: (id: string) => void;
  pauseAll: () => void;
  resumeAll: () => void;
}

export interface ToastProviderProps {
  children: ReactNode;
  defaultOptions?: ToastOptions;
  maxToasts?: number;
  newestOnTop?: boolean;
}

export interface ToastComponentProps {
  toast: Toast;
  onDismiss: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}