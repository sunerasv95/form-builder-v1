"use client"

import FormElementBuilder from "./form-element-builder";
import { FormElementType, ElementType } from '../types'
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

type FormType = {
    title: string;
    description: string;
    elements: FormElementType[];
}

const FormBuilder = (): React.ReactNode => {
    console.info("FormBuilder Loaded!");

    const [form, setForm] = useState<FormType>({
        title: "Untitled Form",
        description: "",
        elements: []
    });

    const addElement = (type: ElementType) => {
        const elementId = uuidv4();
        setForm(prevForm => {
            const newElement: FormElementType = {
                id: elementId,
                type,
                labelName: `New ${type} field`,
                value: "",
                required: false,
                options: []
            };

            if (type === "checkbox" || type === "select") {
                const newOptions = [
                    { id: uuidv4(), value: "Option 1" },
                    { id: uuidv4(), value: "Option 2" }
                ];
                newElement.options = newOptions;
            }

            return {
                ...prevForm,
                elements: [...prevForm.elements, newElement]
            };
        });
    }

    const addElementOption = (parentId: string) => {
        setForm(prevForm => {
            return {
                ...prevForm,
                elements: prevForm.elements.map(el => (
                    el.id === parentId ?
                        { ...el, options: [...el.options, { id: uuidv4(), value: `Option` }] } :
                        el
                ))
            }
        });
    }

    const changeFormField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        });
    }

    const changeElement = (id: string, changes: Partial<FormElementType>) => {
        setForm((prevForm) => ({
            ...prevForm,
            elements: prevForm.elements.map((el) => {
                return el.id === id ? { ...el, ...changes } : el;
            }),
        }));
    };

    const changeElementOption = (childId: string, parentId: string, value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            elements: prevForm.elements.map(el =>
                el.id === parentId
                    ? {
                          ...el,
                          options: el.options.map(opt =>
                              opt.id === childId ? { ...opt, value } : opt
                          )
                      }
                    : el
            )
        }));
    };

    const deleteElement = (id: string, parentId?: string) => {
        if (parentId) {
            const childId = id;
            setForm(prevForm => {
                return {
                    ...prevForm,
                    elements: prevForm.elements.map(el => {
                        return el.id === parentId ?
                            { ...el, options: el.options.filter(opt => opt.id !== childId) } :
                            el
                    })
                }
            });
        } else {
            setForm(prevForm => {
                return {
                    ...prevForm,
                    elements: [...prevForm.elements.filter(el => el.id !== id)]
                }
            });
        }
    }

    return (
        <>
            <aside className="bg-white p-3">
                <h2 className="text-lg font-semibold mb-4">Add Form Elements</h2>
                <div className="grid grid-cols-2 gap-2 pr-2">
                    <button
                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold p-4 rounded"
                        onClick={() => addElement("input")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <span className="text-sm m-1">Text</span>
                    </button>
                    <button
                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold p-4 rounded"
                        onClick={() => addElement("paragraph")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-paragraph" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <span className="text-sm m-1">Paragraph</span>
                    </button>
                    <button
                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold p-4 rounded"
                        onClick={() => addElement("checkbox")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
                        </svg>
                        <span className="text-sm m-1">Checkbox</span>
                    </button>
                    <button
                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold p-4 rounded"
                        onClick={() => addElement("select")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-menu-app" viewBox="0 0 16 16">
                            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <span className="text-sm m-1">Select</span>
                    </button>
                </div>
            </aside>
            <main className=" px-5 py-6">
                <div className="bg-gray-100 shadow-md rounded-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            name="title"
                            className="text-xl font-bold border-0 rounded w-full py-3 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                            value={form?.title}
                            placeholder="Untitled Form"
                            onChange={(e) => changeFormField(e)} />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="description"
                            className="border-0 rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                            value={form?.description}
                            placeholder="Enter form description here..."
                            onChange={(e) => changeFormField(e)} />
                    </div>
                    {form?.elements.length > 0 ? form?.elements.map(el => (
                        <FormElementBuilder
                            key={el.id}
                            element={el}
                            onChange={(changes) => changeElement(el.id, changes)}
                            onDelete={() => deleteElement(el.id)}
                            onAddOption={() => addElementOption(el.id)}
                            onChangeOption={(childId, value) => changeElementOption(childId, el.id, value)}
                            onDeleteOption={(childId) => deleteElement(childId, el.id)} />
                    )) :
                        <div className="text-sm text-gray-500 my-2 px-3 italic">
                            No form fields added yet. Use the panel on the left to add form elements.
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default FormBuilder;