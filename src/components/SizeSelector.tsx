import { ErrorMessage, Field } from "formik";

interface SizeSelectorProps {
    inventory: any
    index: number
}

const sizeOptions = [
    {
        type: "none",
        options: [{ label: "None", value: "none" }]
    },
    {
        type: "standard",
        options: [
            { label: "XS", value: "XS" },
            { label: "S", value: "S" },
            { label: "M", value: "M" },
            { label: "L", value: "L" },
            { label: "XL", value: "XL" },
            { label: "2XL", value: "2XL" },
            { label: "3XL", value: "3XL" }
        ]
    },
    {
        type: "numerical",
        options: Array.from({ length: 13 }, (_, i) => {
            const value = (i < 8 ? 5 + i * 0.5 : 9 + (i - 8) * 0.5).toFixed(1);
            return { label: value, value };
        })
    },
    {
        type: "length",
        options: ["XXS", "SS", "SR", "SL", "MS", "MR", "ML", "LS", "LR", "LL"].map(value => ({ label: value, value }))
    },
    {
        type: "fit",
        options: [
            ...["5R", "5.5R", "6R", "6.5R", "7R", "7.5R", "8R", "8.5R", "9R", "9.5R", "10R", "10.5R", "11R", "11.5R", "12R"],
            ...["5W", "5.5W", "6W", "6.5W", "7W", "7.5W", "8W", "8.5W", "9W", "9.5W", "10W", "10.5W", "11W", "11.5W", "12W"]
        ].map(value => ({ label: value, value }))
    },
    {
        type: "expanded",
        options: Array.from({ length: 9 }, (_, i) => {
            const value = (52 + i).toString();
            return { label: value, value };
        })
    },
    {
        type: "roman",
        options: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map(value => ({ label: value, value }))
    }
];

export default function SizeSelector({ inventory, index }: SizeSelectorProps) {
    const selectedSizeType = inventory?.sizeType;
    const selectedOptions = sizeOptions.find(option => option.type === selectedSizeType)?.options || [];

    return (
        <div className="flex h-auto flex-col py-3 col-span-2">
            <label className="pb-2" htmlFor={`inventory[${index}].item.size`}>
                Size <span className="text-gray-500">(Optional)</span>
            </label>

            <Field as="select"
                name={`inventory[${index}].item.size`}
                disabled={selectedSizeType === 'none'}
                className="bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon"
            >
                {selectedOptions.map(({ label, value }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </Field>

            <div className="h-6">
                <ErrorMessage className="text-red-400" name={`inventory[${index}].item.size`} component="div" />
            </div>
        </div>
    );
}
