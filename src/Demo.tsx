import { useState } from 'react';
import { ToastProvider, useToast } from './index';

const ToastDemo = () => {
    const { toast, success, error, info, warning, loading, custom, update, dismiss } = useToast();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const showBasicToast = () => {
        toast('This is a basic toast message!');
    };

    const showSuccessToast = () => {
        success('Operation completed successfully!', {
            duration: 5000,
            progressBar: true
        });
    };

    const showErrorToast = () => {
        error('An error occurred. Please try again.', {
            duration: 7000,
            dismissible: true,
            progressBar: true
        });
    };

    const showInfoToast = () => {
        info('Did you know? Toast notifications are really useful!', {
            position: 'bottom-center',
            animation: 'bounce'
        });
    };

    const showWarningToast = () => {
        warning('Please back up your data before continuing.', {
            position: 'top-center',
            animation: 'scale'
        });
    };

    const showLoadingToast = () => {
        if (loadingId) {
            dismiss(loadingId);
        }

        const id = loading('Processing your request...', {
            position: 'top-center',
        });

        setLoadingId(id);

        setTimeout(() => {
            update(id, {
                type: 'success',
                content: 'Request processed successfully!',
                duration: 3000,
            });

            setLoadingId(null);
        }, 3000);
    };

    const showCustomActionToast = () => {
        toast('Your file has been uploaded.', {
            action: {
                label: 'Undo',
                onClick: () => {
                    info('Upload canceled!');
                },
                theme: 'primary'
            }
        });
    };

    const showRichContentToast = () => {
        custom('# Rich Content Toast\n\nThis toast supports **markdown** and can be *styled* accordingly.\n\n- Item 1\n- Item 2\n- Item 3', {
            richContent: true,
            duration: 10000,
            position: 'bottom-right',
            animation: 'flip'
        });
    };

    const showToastWithSound = () => {
        success('Notification with sound!', {
            sound: true
        });
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Toast-X Demo</h1>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={showBasicToast}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Basic Toast
                </button>
                <button
                    onClick={showSuccessToast}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Success Toast
                </button>
                <button
                    onClick={showErrorToast}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Error Toast
                </button>
                <button
                    onClick={showInfoToast}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Info Toast
                </button>
                <button
                    onClick={showWarningToast}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Warning Toast
                </button>
                <button
                    onClick={showLoadingToast}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                    Loading Toast
                </button>
                <button
                    onClick={showCustomActionToast}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                    Toast with Action
                </button>
                <button
                    onClick={showRichContentToast}
                    className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                    Rich Content Toast
                </button>
                <button
                    onClick={showToastWithSound}
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                    Toast with Sound
                </button>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <ToastProvider>
            <ToastDemo />
        </ToastProvider>
    );
};

export default App;