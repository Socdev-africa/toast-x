import React from 'react';
import { motion } from 'framer-motion';
import { Toast as ToastType, ToastPosition } from '../types';
import Toast from './Toast';

interface ToastContainerProps {
    position: ToastPosition;
    toasts: ToastType[];
    onDismiss: (id: string) => void;
    onMouseEnter?: (id: string) => void;
    onMouseLeave?: (id: string) => void;
    containerClassName?: string;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    position,
    toasts,
    onDismiss,
    onMouseEnter,
    onMouseLeave,
    containerClassName = '',
}) => {
    const getPositionClasses = (): string => {
        switch (position) {
            case 'top-left':
                return 'top-0 left-0';
            case 'top-center':
                return 'top-0 left-1/2 transform -translate-x-1/2';
            case 'top-right':
                return 'top-0 right-0';
            case 'bottom-left':
                return 'bottom-0 left-0';
            case 'bottom-center':
                return 'bottom-0 left-1/2 transform -translate-x-1/2';
            case 'bottom-right':
                return 'bottom-0 right-0';
            default:
                return 'top-0 right-0';
        }
    };

    return (
        <div
            className={`fixed z-50 p-4 max-h-screen overflow-hidden pointer-events-none ${getPositionClasses()} ${containerClassName}`}
            aria-live="assertive"
        >
            <motion.div layout className="flex flex-col space-y-3 w-full items-center">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
                        <Toast
                            toast={toast}
                            onDismiss={() => onDismiss(toast.id)}
                            onMouseEnter={() => onMouseEnter?.(toast.id)}
                            onMouseLeave={() => onMouseLeave?.(toast.id)}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ToastContainer;