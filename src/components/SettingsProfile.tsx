interface Props {
    schema: any
}

const SettingsProfile: React.FC<Props> = ({ schema }) => {
    return (
        <div className="w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1">
            <div className="flex h-auto flex-col p-1">
                <label className="pb-2 text-gray-500" htmlFor="first_name">First Name</label>
                <input
                    name="first_name"
                    value={schema.values.first_name}
                    onChange={schema.handleChange}
                    type="text"
                    id="first_name"
                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                    placeholder="Enter First Name"
                    required
                />
                {
                    schema.errors.first_name && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {schema.errors.first_name}
                        </p>
                    )
                }
            </div>
            <div className="flex h-auto flex-col p-1">
                <label className="pb-2 text-gray-500" htmlFor="last_name">Last Name</label>
                <input
                    name="last_name"
                    value={schema.values.last_name}
                    onChange={schema.handleChange}
                    type="text"
                    id="last_name"
                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                    placeholder="Enter Last Name"
                    required
                />
                {
                    schema.errors.last_name && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {schema.errors.last_name}
                        </p>
                    )
                }
            </div>
            <div className="flex h-auto flex-col p-1">
                <label className="pb-2 text-gray-500" htmlFor="username">Username</label>
                <input
                    name="username"
                    value={schema.values.username}
                    onChange={schema.handleChange}
                    type="text"
                    id="username"
                    className="h-12 border border-gray-300 p-4 mb-1 text-gray-500 bg-transparent rounded-md"
                    placeholder="Enter Username"
                />
                {
                    schema.errors.username && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {schema.errors.username}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default SettingsProfile