import {useState} from 'react';
import CreateUserForm from "./CreateUserForm.tsx";
import {IUser} from "../../entities/user.ts";

interface IHistory{
    key: keyof IUser;
    oldValue: string;
    newValue: string;
}

const CreateUser = () => {
    const [history, setHistory] = useState<IHistory[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [formData, setFormData] = useState<IUser>(
        {
            name: 'ali',
            family: 'ali',
            email: 'a.ali@gmail.com',
            phone_number: '09121111111',
            job: '',
            job_description: ''
        });

    console.log({formData})
    console.log({history})

    const updateFormData = (key: keyof IUser, value: string) => {
        if (formData[key] === value) return;
        const newChange: IHistory = { key, oldValue:formData[key], newValue: value };
        const newHistory = history.slice(0, historyIndex + 1);
        setHistory([...newHistory, newChange]);
        setHistoryIndex(newHistory.length);
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const undo = () => {
            const { key, oldValue } = history[historyIndex];
            setFormData((prev) => ({ ...prev, [key]: oldValue }));
            setHistoryIndex(historyIndex - 1);
    };

    const redo = () => {
            const { key, newValue } = history[historyIndex + 1];
            setFormData((prev) => ({ ...prev, [key]: newValue }));
            setHistoryIndex(historyIndex + 1);
    };

    const resetHistory = ()=>{
        setHistory([])
        setHistoryIndex(-1)
    }

    return (
        <div>

            <button
                onClick={undo}
                disabled={historyIndex === -1}
            >
                Undo
            </button>
            <button
                onClick={redo}
                disabled={historyIndex === history.length-1}
            >
                Redo
            </button>
            
            <CreateUserForm
                user={formData}
                onChange={updateFormData}
                onChangeStep={resetHistory}
            />

        </div>
    );
};

export default CreateUser;
