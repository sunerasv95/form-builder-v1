type TextInputType = {
    id: string;
    value?: string;
    placeholder: string;
    disabled: boolean;
    borderLess?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({
    id,
    value,
    placeholder,
    disabled,
    borderLess = false,
    onChange
}: TextInputType): React.ReactElement => {
    return (
        <input
            id={id}
            value={value}
            type="text"
            className={`mt-3 rounded-lg text-base text-gray-600 w-full ${borderLess ? "border-0 focus:outline-0 px-1": "border border-gray p-3"}`}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
        />
    );
}

export default TextInput;