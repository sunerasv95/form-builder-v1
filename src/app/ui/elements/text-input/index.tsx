type TextInputType = {
    id: string;
    value?: string;
    placeholder: string;
    disabled: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({ 
    id,
    value,
    placeholder, 
    disabled, 
    onChange
}: TextInputType): React.ReactElement => {
    return (
        <input
            id={id}
            value={value}
            type="text"
            className="mt-2 p-3 rounded-lg border border-black text-base w-full"
            placeholder={placeholder}
            disabled={disabled} 
            onChange={onChange}
        />
    );
}

export default TextInput;