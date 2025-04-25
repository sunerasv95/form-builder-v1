import { useId } from "react";

type ButtonIcon = {
    id?: string;
    children: React.ReactElement,
    onClick: () => void
}

const ButtonIcon = ({
    id,
    children,
    onClick
}: ButtonIcon) => {

    const defaultId = useId();
    return (
        <button
            id={id || defaultId}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium px-3 py-2 rounded-lg transition"
            onClick={onClick}
        >
            {children}
        </button>

    );
}

export default ButtonIcon;