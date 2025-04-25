
export type FormElementType = {
    id: string;
    type: ElementType;
    labelName: string;
    value: string;
    required: boolean,
    options: Selection[]
}

export type Selection = {
    id: string;
    value: string;
}

export type ElementType = "input" | "checkbox" | "select" | "paragraph";


