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
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[500px] max-w-[700px]">
                <h2 className="text-xl font-medium text-center text-gray-800 mb-4">{title}</h2>
                <p className="text-gray-500 mb-6 text-center">
                    {message}
                </p>
                <div className="flex space-x-3">
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
