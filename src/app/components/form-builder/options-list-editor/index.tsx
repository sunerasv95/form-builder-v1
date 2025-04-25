import { CircleCheck, EllipsisVertical, SquareCheck, Trash } from "lucide-react";
import TextInput from "../../../ui/elements/text-input";
import ButtonIcon from "../../../ui/elements/buttons/button-icon";
import { Selection } from "@/app/components/types";

type OptionsListEditorType = {
    type: "select" | "checkbox" | "radio";
    options: Selection[];
    onAdd: () => void;
    onChange: (childId: string, value: string) => void;
    onDelete: (childId: string) => void;
}

const OptionsListEditor = ({
    type,
    options,
    onAdd,
    onChange,
    onDelete
}: OptionsListEditorType) => {
    return (
        <>
            <div className="flex flex-col">
                {
                    options.length > 0 ? options.map(opt =>
                        <div key={opt.id} className="flex justify-center items-center gap-4">
                            {
                                type === "checkbox" ? <SquareCheck size={18} color="gray" /> :
                                    (type === "radio" ? <CircleCheck size={18} color="gray" /> :
                                        <EllipsisVertical size={18} color="gray" />
                                    )
                            }
                            <TextInput
                                id={`opt-${opt.id}`}
                                value={opt.value}
                                placeholder={opt.value}
                                disabled={false}
                                onChange={(e) => onChange(opt.id, e.target.value)}
                            />
                            <ButtonIcon
                                onClick={() => onDelete(opt.id)}>
                                <Trash size={14} color="black" />
                            </ButtonIcon>
                        </div>
                    ) :
                        <div className="flex justify-center items-center gap-2">
                            <span>No options available</span>
                        </div>
                }
            </div>
            <button
                type="button"
                className="inline-flex items-center w-22 px-2.5 py-1.5 my-3 mx-8 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                onClick={onAdd}>
                Add Option
            </button>
        </>
    );
}

export default OptionsListEditor;