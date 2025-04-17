// src/components/Toast.tsx
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastComponentProps, ToastType } from '../types';
import { getAnimationVariants } from '../utils/animations';
import markdown from 'markdown-it';

const md = markdown();

const Toast: React.FC<ToastComponentProps> = ({
    toast,
    onDismiss,
    onMouseEnter,
    onMouseLeave
}) => {
    const {
        id,
        content,
        type,
        animation,
        dismissible,
        progressBar,
        duration,
        className,
        richContent,
        action,
        visible
    } = toast;

    const animationVariants = useMemo(() => getAnimationVariants(animation), [animation]);

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1-5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'loading':
                return (
                    <svg className="animate-spin w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                );
            default:
                return null;
        }
    };

    const getToastClassNames = () => {
        const baseClasses = "flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800";
        const typeClasses = {
            success: "border-l-4 border-green-500",
            error: "border-l-4 border-red-500",
            info: "border-l-4 border-blue-500",
            warning: "border-l-4 border-yellow-500",
            loading: "border-l-4 border-blue-500",
            custom: "",
        };

        return `${baseClasses} ${typeClasses[type]} ${className || ''}`;
    };

    const renderContent = () => {
        if (richContent && typeof content === 'string') {
            return (
                <div
                    className="prose dark:prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: md.render(content) }}
                />
            );
        }

        return content;
    };

    return (
        <AnimatePresence initial={false}>
            {visible && (
                <motion.div
                    key={id}
                    className={getToastClassNames()}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={animationVariants}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    drag="x"
                    dragConstraints={{ left: 0, right: 100 }}
                    dragElastic={0.9}
                    whileDrag={{ scale: 0.98 }}
                    onDragEnd={(_, info) => {
                        if (info.offset.x > 100 && dismissible) {
                            onDismiss();
                        }
                    }}
                    layout
                >
                    <div className="flex-shrink-0 flex items-center justify-center w-12 bg-opacity-10 dark:bg-opacity-10">
                        {getToastIcon(type)}
                    </div>

                    <div className="flex flex-col flex-grow px-4 py-2 relative">
                        {progressBar && duration !== false && (
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-current opacity-30"
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: duration / 1000, ease: 'linear' }}
                                style={{
                                    backgroundColor:
                                        type === 'success' ? '#10B981' :
                                            type === 'error' ? '#EF4444' :
                                                type === 'warning' ? '#F59E0B' :
                                                    '#3B82F6'
                                }}
                            />
                        )}

                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-start">
                                <div className="flex-grow">{renderContent()}</div>

                                {dismissible && (
                                    <button
                                        onClick={onDismiss}
                                        className="ml-3 -mt-1 -mr-1 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {action && (
                                <div className="mt-2">
                                    <button
                                        onClick={action.onClick}
                                        className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${action.theme === 'secondary'
                                                ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
                                                : action.theme === 'danger'
                                                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                            }`}
                                    >
                                        {action.label}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;