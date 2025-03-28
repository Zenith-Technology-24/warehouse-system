import React from 'react';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    handleFunction: () => void;
    message: string;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, handleFunction, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center !z-[9999]">
            <div className="bg-white rounded-lg shadow-lg p-4 min-w-[600px] max-w-xs">
                <h2 className="text-lg font-medium text-center text-gray-800 mb-3">{title}</h2>
                <p className="text-gray-500 mb-4 text-center text-sm">{message}</p>
                <div className="flex space-x-2">
                    <button
                        onClick={onClose}
                        className="grow border-aaa hover:border-aaa text-aaa py-2 px-3 rounded-lg text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleFunction}
                        className="grow bg-aaa hover:border-aaa text-white py-2 px-3 rounded-lg text-sm"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
