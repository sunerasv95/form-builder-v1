type ParagraphType = {
    id: string;
    placeholder: string;
    disabled: boolean;
}

const Paragraph = ({ 
    id,
    placeholder, 
    disabled 
}: ParagraphType) => {
    return (
        <textarea
            id={id}
            className="block w-full border-1 p-2 text-gray-900 placeholder-gray-500 rounded"
            placeholder={placeholder}
            disabled={disabled}>
        </textarea>
    );
}

export default Paragraph;