import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

interface ToastContextProps {
    showToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<{ title: string, message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const showToast = (title: string, message: string, type: 'success' | 'error' | 'info') => {
        setToast({ title, message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }
        }>
            {children}
            {
                toast && (
                    <Toast
                        title={toast.title}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)
                        }
                    />
                )}
        </ToastContext.Provider>
    );
};
