import { useState } from "react"

interface Props {
    schema: any
}

const SettingsPassword: React.FC<Props> = ({ schema }) => {
    const [currentType, setCurrentType] = useState<string>('password')
    const [newType, setNewType] = useState<string>('password')
    const [confirmType, setConfirmType] = useState<string>('password')

    return (
        <div className="w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1">
            <div className="flex h-auto flex-col p-1">
                <label className="pb-2 text-gray-500" htmlFor="current_password">Current Password</label>
                <div className="relative">
                    <input
                        name="current_password"
                        value={schema.values.current_password}
                        onChange={schema.handleChange}
                        type={currentType}
                        id="current_password"
                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md w-full"
                        placeholder="Enter Current Password"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {
                            currentType === 'password' ? (
                                <svg onClick={() => setCurrentType('text')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                    <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                    <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                </svg>
                            ) : (
                                <svg onClick={() => setCurrentType('password')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                </svg>
                            )
                        }
                    </div>
                </div>
                {
                    schema.errors.current_password && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {schema.errors.current_password}
                        </p>
                    )
                }
            </div>
            <div className="flex h-auto flex-col p-1">
                <label className="pb-2 text-gray-500" htmlFor="new_password">New Password</label>
                <div className="relative">
                    <input
                        name="new_password"
                        value={schema.values.new_password}
                        onChange={schema.handleChange}
                        type={newType}
                        id="new_password"
                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md w-full"
                        placeholder="Enter New Password"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {
                            newType === 'password' ? (
                                <svg onClick={() => setNewType('text')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                    <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                    <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                </svg>
                            ) : (
                                <svg onClick={() => setNewType('password')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                </svg>
                            )
                        }
                    </div>
                </div>
                {
                    schema.errors.new_password && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {schema.errors.new_password}
                        </p>
                    )
                }
            </div>
            <div className="flex h-auto flex-col p-1">
                <label className="pb-2 text-gray-500" htmlFor="confirm_password">Confirm Password</label>
                <div className="relative">
                    <input
                        name="confirm_password"
                        value={schema.values.confirm_password}
                        onChange={schema.handleChange}
                        type={confirmType}
                        id="confirm_password"
                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md w-full"
                        placeholder="Enter Confirm Password"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {
                            confirmType === 'password' ? (
                                <svg onClick={() => setConfirmType('text')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                    <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                    <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                </svg>
                            ) : (
                                <svg onClick={() => setConfirmType('password')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                </svg>
                            )
                        }
                    </div>
                </div>
                {
                    schema.errors.confirm_password && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {schema.errors.confirm_password}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default SettingsPassword