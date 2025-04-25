"use client"

import React from "react";
import { Trash } from "lucide-react";
import TextInput from "@/app/ui/elements/text-input";
import Paragraph from "@/app/ui/elements/text-area";
import ButtonIcon from "@/app/ui/elements/buttons/button-icon";
import { FormElementType, ElementType } from "../../types";
import OptionsListEditor from "@/app/components/form-builder/options-list-editor";

type ElementBuilderType = {
    element: FormElementType;
    onChange: (changes: Partial<FormElementType>) => void;
    onDelete: () => void;
    onAddOption: () => void;
    onChangeOption: (childId: string, value: string) => void;
    onDeleteOption: (childId: string) => void;
}

const FormElementBuilder = ({
    element,
    onChange,
    onDelete,
    onAddOption,
    onChangeOption,
    onDeleteOption
}: ElementBuilderType):
    React.ReactNode => {

    const { id, type, labelName, required, options } = element;

    const elementsLookup: Record<ElementType | "default", () => React.ReactNode> = {
        "input": () => (
            <TextInput
                id={`inpd-${id}`}
                placeholder={labelName ? `Enter ${labelName.toLowerCase()}` : ""}
                disabled={true}
            />
        ),
        "paragraph": () => (
            <Paragraph
                id={`txt-${id}`}
                placeholder={labelName ? `Enter ${labelName.toLowerCase()}` : ""}
                disabled={true}
            />
        ),
        "checkbox": () => (
            <OptionsListEditor
                type="checkbox"
                options={options}
                onAdd={onAddOption}
                onChange={(childId, value) => onChangeOption(childId, value)}
                onDelete={childId => onDeleteOption(childId)}
            />
        ),
        "select": () => (
            <OptionsListEditor
                type="select"
                options={options}
                onAdd={onAddOption}
                onChange={(childId, value) => onChangeOption(childId, value)}
                onDelete={childId => onDeleteOption(childId)}
            />
        ),
        default: () => (
            <TextInput
                id={`inpd-${id}`}
                placeholder={labelName ? `Enter ${labelName.toLowerCase()}` : ""}
                disabled={true}
            />
        )
    };

    return (
        <div className="flex flex-col bg-[#f7f8fa] p-5 mb-3 rounded-lg w-full shadow">
            <div className="flex justify-between items-center">
                {/* <label className="font-bold text-xl">Your name</label> */}
                <input
                    key={id}
                    id={`lbl-${id}`}
                    type="text"
                    className="mt-2 py-3 rounded-lg outline-none text-base w-full bg-[#f7f8fa]"
                    value={labelName}
                    placeholder="Enter label name"
                    onChange={(e) => onChange({ labelName: e.target.value })} />
                <div className="flex items-center gap-4">
                    <input
                        id={`rqd-${id}`}
                        type="checkbox"
                        checked={required}
                        onChange={() => onChange({ required: !required })}
                    />
                    <label htmlFor={`rqd-${id}`}>Required</label>
                    <ButtonIcon onClick={onDelete}>
                        <Trash size={16} color="black" />
                    </ButtonIcon>
                </div>
            </div>
            {elementsLookup[type]() || elementsLookup.default()}
        </div>

    );
};

export default FormElementBuilder;