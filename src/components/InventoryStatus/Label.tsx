interface LabelProps {
    label: string;
    value: string;
    bulletColor: string;
    bulletSize?: number;
}

const Label: React.FC<LabelProps> = ({ label, value, bulletColor, bulletSize = 15 }) => {

    return (
        <div className="text-center flex flex-col justify-center mx-6">
            <div className="flex items-center justify-center space-x-2">
                <div
                    className={`rounded-full`}
                    style={{
                        backgroundColor: bulletColor,
                        width: `${bulletSize}px`,
                        height: `${bulletSize}px`,
                    }}
                ></div>
                <span className="text-lg text-gray-500">{label}</span>
            </div>
            <div className="text-center">
                <p className="font-medium text-2xl">{value}</p>
            </div>
        </div>
    );
}

export default Label