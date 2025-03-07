import {useState} from 'react';
import CreateUserForm from "./CreateUserForm.tsx";
import {IUser} from "../../entities/user.ts";

interface IHistory{
    key: keyof IUser;
    value: string;
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

    const updateFormData = (key: keyof IUser, value: string) => {
        if (formData[key] === value) return;
        const newChange = { key, value };
        const newHistory = history.slice(0, historyIndex + 1);
        setHistory([...newHistory, newChange]);
        setHistoryIndex(newHistory.length);
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const undo = () => {
        if (historyIndex >= 0) {
            const { key, value } = history[historyIndex];
            setFormData((prev) => ({ ...prev, [key]: value }));
            setHistoryIndex(historyIndex - 1);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const { key, value } = history[historyIndex + 1];
            setFormData((prev) => ({ ...prev, [key]: value }));
            setHistoryIndex(historyIndex + 1);
        }
    };

    const resetHistory = ()=>{
        setHistory([])
        setHistoryIndex(-1)
    }

    return (
        <div>

            {historyIndex > -1 && <button
                onClick={undo}
            >
                Undo
            </button>}
            {historyIndex < history.length-1 && <button
                onClick={redo}
            >
                Redo
            </button>
            }
            <CreateUserForm
                user={formData}
                onChange={updateFormData}
                onChangeStep={resetHistory}
            />

        </div>
    );
};

export default CreateUser;
