import {useCallback, useEffect, useReducer} from 'react';
import CreateUserForm from "./CreateUserForm.tsx";
import {IUser} from "../../entities/user.ts";
import {emptyUser, initialFormData, removeLocalData, saveLocalData} from "./model/draft.ts";

interface IHistory{
    key: keyof IUser;
    oldValue: string;
    newValue: string;
}

interface IFormState {
    history: IHistory[];
    historyIndex: number;
    formData: IUser;
}


type TFormAction =
    | { type: "UPDATE"; payload: IHistory }
    | { type: "UNDO" }
    | { type: "REDO" }
    | { type: "RESET_HISTORY" }
    | { type: "RESET" };

const formReducer = (state: IFormState, action: TFormAction) => {
    switch (action.type) {
        case "UPDATE":
            return {
                history: [
                    ...state.history.slice(0, state.historyIndex + 1),
                    {
                        key: action.payload.key,
                        oldValue:state.formData[action.payload.key],
                        newValue: action.payload.newValue
                    }
                ],
                historyIndex: state.historyIndex + 1,
                formData: { ...state.formData, [action.payload.key]: action.payload.newValue }
            };
        case "UNDO":
            return {
                ...state,
                historyIndex: state.historyIndex -1,
                formData: {
                    ...state.formData ,
                    [state.history[state.historyIndex].key]: state.history[state.historyIndex].oldValue
                }
            };
        case "REDO":
            return {
                ...state,
                historyIndex: state.historyIndex +1,
                formData: {
                    ...state.formData ,
                    [state.history[state.historyIndex+1].key]: state.history[state.historyIndex+1].newValue
                }
            };
        case "RESET_HISTORY":
            return {
                ...state,
                historyIndex: -1,
                history: []
            };
        case "RESET":
            return {
                historyIndex: -1,
                history: [],
                formData: emptyUser,
            };
        default:
            return state;
    }
};

const CreateUser = () => {
    const [state, dispatch] = useReducer(formReducer, {formData:initialFormData, historyIndex: -1, history: []})

    const updateFormData = useCallback((key: keyof IUser, value: string) => {
        if (state.formData[key] === value) return;
        dispatch({ type: "UPDATE", payload: {key, oldValue: state.formData[key], newValue: value} });
    }, [state, dispatch]);

    const undo = useCallback(() => {
        dispatch({ type: 'UNDO'})
    }, [dispatch]);

    const redo = useCallback(() => {
        dispatch({ type: 'REDO'})
    }, [dispatch]);

    const resetHistory = useCallback(()=>{
        dispatch({ type: 'RESET_HISTORY'})
    }, [dispatch])

    useEffect(() => {
        saveLocalData(state.formData)
    }, [state.formData]);

    const onSubmit  = useCallback(()=>{
        dispatch({ type: 'RESET'})
        removeLocalData();
        alert("کاربر ایجاد شد")
    }, [dispatch]);

    return (
        <div>

            <button
                onClick={undo}
                disabled={state.historyIndex === -1}
            >
                Undo
            </button>
            <button
                onClick={redo}
                disabled={state.historyIndex === state.history.length-1}
            >
                Redo
            </button>

            <CreateUserForm
                user={state.formData}
                onChange={updateFormData}
                onChangeStep={resetHistory}
                onSubmit={onSubmit}
            />

        </div>
    );
};

export default CreateUser;
