// src/components/Toast.tsx
import React, { useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastComponentProps, ToastType } from '../types';
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

    // Track if the component is mounted to prevent memory leaks
    const isMounted = useRef(true);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const animationVariants = useMemo(() => {
        switch (animation) {
            case 'slide':
                return {
                    initial: { x: 100, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    exit: { x: 100, opacity: 0 }
                };
            case 'fade':
                return {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 }
                };
            case 'scale':
                return {
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.8, opacity: 0 }
                };
            case 'bounce':
                return {
                    initial: { y: -20, opacity: 0 },
                    animate: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }
                    },
                    exit: { y: -20, opacity: 0 }
                };
            case 'flip':
                return {
                    initial: { rotateX: 90, opacity: 0 },
                    animate: { rotateX: 0, opacity: 1 },
                    exit: { rotateX: 90, opacity: 0 }
                };
            default:
                return {
                    initial: { x: 100, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    exit: { x: 100, opacity: 0 }
                };
        }
    }, [animation]);

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1-5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'loading':
                return (
                    <svg className="animate-spin w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                );
            default:
                return null;
        }
    };

    const getToastClassNames = () => {
        const baseClasses = "flex w-full max-w-sm overflow-hidden rounded-lg shadow-lg";

        const typeClasses = {
            success: "bg-emerald-50 border-l-4 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-500",
            error: "bg-rose-50 border-l-4 border-rose-500 dark:bg-rose-900/20 dark:border-rose-500",
            info: "bg-sky-50 border-l-4 border-sky-500 dark:bg-sky-900/20 dark:border-sky-500",
            warning: "bg-amber-50 border-l-4 border-amber-500 dark:bg-amber-900/20 dark:border-amber-500",
            loading: "bg-sky-50 border-l-4 border-sky-500 dark:bg-sky-900/20 dark:border-sky-500",
            custom: "bg-white dark:bg-gray-800",
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
        <AnimatePresence initial={false} mode="sync">
            {visible && (
                <motion.div
                    key={id}
                    className={getToastClassNames()}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={animationVariants}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    drag="x"
                    dragConstraints={{ left: 0, right: 100 }}
                    dragElastic={0.9}
                    whileDrag={{ scale: 0.98 }}
                    onDragEnd={(_, info) => {
                        if (info.offset.x > 100 && dismissible && isMounted.current) {
                            onDismiss();
                        }
                    }}
                    layout
                >
                    <div className="flex-shrink-0 flex items-center justify-center w-12">
                        {getToastIcon(type)}
                    </div>

                    <div className="flex flex-col flex-grow px-4 py-3 relative">
                        {progressBar && duration !== false && (
                            <motion.div
                                className="absolute bottom-0 left-0 h-1"
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: duration / 1000, ease: 'linear' }}
                                style={{
                                    backgroundColor:
                                        type === 'success' ? 'rgb(16, 185, 129)' : // emerald-500
                                            type === 'error' ? 'rgb(244, 63, 94)' : // rose-500
                                                type === 'warning' ? 'rgb(245, 158, 11)' : // amber-500
                                                    'rgb(14, 165, 233)' // sky-500
                                }}
                            />
                        )}

                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-start">
                                <div className="flex-grow font-medium">{renderContent()}</div>

                                {dismissible && (
                                    <button
                                        onClick={onDismiss}
                                        className="ml-3 -mt-1 -mr-1 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
                                        aria-label="Close"
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
                                        className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${action.theme === 'secondary'
                                                ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
                                                : action.theme === 'danger'
                                                    ? 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
                                                    : 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500'
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