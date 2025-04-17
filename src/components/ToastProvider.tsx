import React, { createContext, useCallback, useReducer, useMemo, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContextValue, Toast, ToastOptions, ToastProviderProps } from '../types';
import ToastContainer from './ToastContainer';

type ToastAction =
    | { type: 'ADD_TOAST'; toast: Toast }
    | { type: 'UPDATE_TOAST'; id: string; options: Partial<Toast> }
    | { type: 'DISMISS_TOAST'; id: string }
    | { type: 'DISMISS_ALL' }
    | { type: 'SET_VISIBLE'; id: string; visible: boolean }
    | { type: 'PAUSE_TOAST'; id: string }
    | { type: 'RESUME_TOAST'; id: string }
    | { type: 'PAUSE_ALL' }
    | { type: 'RESUME_ALL' };

interface ToastState {
    toasts: Toast[];
    paused: Record<string, boolean>;
}

const defaultOptions: Required<Omit<ToastOptions, 'id' | 'action' | 'onClose' | 'group' | 'zIndex'>> = {
    type: 'info',
    duration: 5000,
    position: 'top-right',
    animation: 'slide',
    dismissible: true,
    progressBar: false,
    pauseOnHover: true,
    sound: false,
    richContent: false,
    priority: 0,
    className: '',
};

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
    switch (action.type) {
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [...state.toasts, action.toast],
            };
        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.id ? { ...toast, ...action.options } : toast
                ),
            };
        case 'DISMISS_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.id ? { ...toast, visible: false } : toast
                ),
            };
        case 'DISMISS_ALL':
            return {
                ...state,
                toasts: state.toasts.map((toast) => ({ ...toast, visible: false })),
            };
        case 'SET_VISIBLE':
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.id ? { ...toast, visible: action.visible } : toast
                ),
            };
        case 'PAUSE_TOAST':
            return {
                ...state,
                paused: { ...state.paused, [action.id]: true },
            };
        case 'RESUME_TOAST':
            return {
                ...state,
                paused: { ...state.paused, [action.id]: false },
            };
        case 'PAUSE_ALL':
            return {
                ...state,
                paused: state.toasts.reduce(
                    (acc, toast) => ({ ...acc, [toast.id]: true }),
                    {}
                ),
            };
        case 'RESUME_ALL':
            return {
                ...state,
                paused: state.toasts.reduce(
                    (acc, toast) => ({ ...acc, [toast.id]: false }),
                    {}
                ),
            };
        default:
            return state;
    }
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    defaultOptions: userDefaultOptions,
    maxToasts = 10,
    newestOnTop = true,
}) => {
    const [state, dispatch] = useReducer(toastReducer, { toasts: [], paused: {} });
    const mergedDefaultOptions = { ...defaultOptions, ...userDefaultOptions };
    const toastTimers = useRef<Record<string, NodeJS.Timeout>>({});

    useEffect(() => {
        const visibleToasts = state.toasts.filter((toast) => toast.visible);
        if (visibleToasts.length > maxToasts) {
            const toastsToRemove = [...visibleToasts]
                .sort((a, b) => {
                    if (a.priority !== b.priority) {
                        return b.priority - a.priority;
                    }
                    return a.createdAt - b.createdAt;
                })
                .slice(maxToasts);

            toastsToRemove.forEach((toast) => {
                dispatch({ type: 'DISMISS_TOAST', id: toast.id });
            });
        }
    }, [state.toasts, maxToasts]);

    useEffect(() => {
        state.toasts.forEach((toast) => {
            if (toast.visible && toast.sound) {
                const audio = new Audio(typeof toast.sound === 'string' ? toast.sound : '/toast-notification.mp3');
                audio.volume = 0.5;
                audio.play().catch(() => {
                });
            }
        });
    }, [state.toasts]);

    const setupAutoClose = useCallback((toast: Toast) => {
        if (toast.duration !== false && !state.paused[toast.id]) {
            if (toastTimers.current[toast.id]) {
                clearTimeout(toastTimers.current[toast.id]);
            }

            toastTimers.current[toast.id] = setTimeout(() => {
                dispatch({ type: 'DISMISS_TOAST', id: toast.id });
            }, toast.duration);
        }
    }, [state.paused]);

    useEffect(() => {
        state.toasts.forEach((toast) => {
            if (toast.visible && toast.duration !== false && !state.paused[toast.id]) {
                setupAutoClose(toast);
            }
        });

        return () => {
            Object.values(toastTimers.current).forEach(clearTimeout);
        };
    }, [state.toasts, state.paused, setupAutoClose]);

    const createToast = useCallback(
        (content: React.ReactNode, options?: ToastOptions): string => {
            const id = options?.id || uuidv4();

            const toast: Toast = {
                id,
                content,
                createdAt: Date.now(),
                visible: true,
                type: options?.type || mergedDefaultOptions.type,
                duration: options?.duration ?? mergedDefaultOptions.duration,
                position: options?.position || mergedDefaultOptions.position,
                animation: options?.animation || mergedDefaultOptions.animation,
                dismissible: options?.dismissible ?? mergedDefaultOptions.dismissible,
                progressBar: options?.progressBar ?? mergedDefaultOptions.progressBar,
                pauseOnHover: options?.pauseOnHover ?? mergedDefaultOptions.pauseOnHover,
                className: options?.className || mergedDefaultOptions.className,
                sound: options?.sound ?? mergedDefaultOptions.sound,
                richContent: options?.richContent ?? mergedDefaultOptions.richContent,
                priority: options?.priority ?? mergedDefaultOptions.priority,
                group: options?.group,
                zIndex: options?.zIndex,
                action: options?.action,
                onClose: options?.onClose
            };

            dispatch({ type: 'ADD_TOAST', toast });

            if (toast.duration !== false) {
                setupAutoClose(toast);
            }

            return id;
        },
        [mergedDefaultOptions, setupAutoClose]
    );

    const update = useCallback(
        (id: string, options: Partial<ToastOptions> & { content?: React.ReactNode }): void => {
            const { content, ...rest } = options;
            dispatch({
                type: 'UPDATE_TOAST',
                id,
                options: { ...rest, ...(content ? { content } : {}) }
            });

            if (options.duration !== undefined) {
                const toast = state.toasts.find((t) => t.id === id);
                if (toast) {
                    setupAutoClose({ ...toast, ...(options as Partial<Toast>) } as Toast);
                }
            }
        },
        [state.toasts, setupAutoClose]
    );

    const dismiss = useCallback((id: string): void => {
        dispatch({ type: 'DISMISS_TOAST', id });

        if (toastTimers.current[id]) {
            clearTimeout(toastTimers.current[id]);
            delete toastTimers.current[id];
        }

        const toast = state.toasts.find((t) => t.id === id);
        if (toast?.onClose) {
            toast.onClose();
        }
    }, [state.toasts]);

    const dismissAll = useCallback((): void => {
        dispatch({ type: 'DISMISS_ALL' });

        Object.keys(toastTimers.current).forEach((id) => {
            clearTimeout(toastTimers.current[id]);
            delete toastTimers.current[id];
        });
    }, []);

    const isActive = useCallback(
        (id: string): boolean => {
            return state.toasts.some((toast) => toast.id === id && toast.visible);
        },
        [state.toasts]
    );

    const pause = useCallback((id: string): void => {
        dispatch({ type: 'PAUSE_TOAST', id });

        if (toastTimers.current[id]) {
            clearTimeout(toastTimers.current[id]);
            delete toastTimers.current[id];
        }
    }, []);

    const resume = useCallback((id: string): void => {
        dispatch({ type: 'RESUME_TOAST', id });

        const toast = state.toasts.find((t) => t.id === id);
        if (toast && toast.visible && toast.duration !== false) {
            setupAutoClose(toast);
        }
    }, [state.toasts, setupAutoClose]);

    const pauseAll = useCallback((): void => {
        dispatch({ type: 'PAUSE_ALL' });

        Object.keys(toastTimers.current).forEach((id) => {
            clearTimeout(toastTimers.current[id]);
        });
    }, []);

    const resumeAll = useCallback((): void => {
        dispatch({ type: 'RESUME_ALL' });

        state.toasts.forEach((toast) => {
            if (toast.visible && toast.duration !== false) {
                setupAutoClose(toast);
            }
        });
    }, [state.toasts, setupAutoClose]);

    const contextValue = useMemo(
        (): ToastContextValue => ({
            toasts: state.toasts,
            toast: createToast,
            success: (content, options) => createToast(content, { ...options, type: 'success' }),
            error: (content, options) => createToast(content, { ...options, type: 'error' }),
            info: (content, options) => createToast(content, { ...options, type: 'info' }),
            warning: (content, options) => createToast(content, { ...options, type: 'warning' }),
            loading: (content, options) => createToast(content, { ...options, type: 'loading', duration: false }),
            custom: (content, options) => createToast(content, { ...options, type: 'custom' }),
            update,
            dismiss,
            dismissAll,
            isActive,
            pause,
            resume,
            pauseAll,
            resumeAll,
        }),
        [
            state.toasts,
            createToast,
            update,
            dismiss,
            dismissAll,
            isActive,
            pause,
            resume,
            pauseAll,
            resumeAll
        ]
    );

    const sortedToasts = useMemo(() => {
        return [...state.toasts].sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }

            return newestOnTop
                ? b.createdAt - a.createdAt
                : a.createdAt - b.createdAt;
        });
    }, [state.toasts, newestOnTop]);

    const toastsByPosition = useMemo(() => {
        return sortedToasts.reduce<Record<string, Toast[]>>((acc, toast) => {
            if (!acc[toast.position]) {
                acc[toast.position] = [];
            }
            acc[toast.position].push(toast);
            return acc;
        }, {});
    }, [sortedToasts]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}

            {Object.entries(toastsByPosition).map(([position, toasts]) => (
                <ToastContainer
                    key={position}
                    position={position as any}
                    toasts={toasts}
                    onDismiss={dismiss}
                    onMouseEnter={(id) => {
                        if (toasts.find((t) => t.id === id)?.pauseOnHover) {
                            pause(id);
                        }
                    }}
                    onMouseLeave={(id) => {
                        if (toasts.find((t) => t.id === id)?.pauseOnHover) {
                            resume(id);
                        }
                    }}
                />
            ))}
        </ToastContext.Provider>
    );
};

export default ToastProvider;