import {useCallback, useEffect, useReducer} from 'react';
import CreateUserForm from "./CreateUserForm.tsx";
import {IUser} from "../../entities/user.ts";
import {emptyUser, initialFormData, removeLocalData, saveLocalData} from "./model/draft.ts";
import {stepsConfig} from "./model/formConfig.ts";

interface IHistory{
    key: keyof IUser;
    oldValue: string;
    newValue: string;
}

interface IFormState {
    history: IHistory[];
    historyIndex: number;
    formData: IUser;
    step: number;
}


type TFormAction =
    | { type: "UPDATE"; payload: IHistory }
    | { type: "UNDO" }
    | { type: "REDO" }
    | { type: "NEXT_STEP" }
    | { type: "PREV_STEP" };

const formReducer = (state: IFormState, action: TFormAction) => {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
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
        case "NEXT_STEP":
            if(state.step === stepsConfig.length -1){
                removeLocalData();
                alert("کاربر ایجاد شد")
                return {
                    step: 0,
                    historyIndex: -1,
                    history: [],
                    formData: emptyUser,
                }
            }
            return  {
                ...state,
                step: state.step + 1,
                history: [],
                historyIndex: -1
            };
        case "PREV_STEP":
            return {
                ...state,
                step: state.step - 1,
                history: [],
                historyIndex: -1,
            };
        default:
            return state;
    }
};

const CreateUser = () => {
    const [state, dispatch] = useReducer(formReducer, {formData:initialFormData, historyIndex: -1, history: [], step: 0})

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
    const onNextStep = useCallback(() => {
        dispatch({ type: 'NEXT_STEP'})
    }, [dispatch]);
    const onPrevStep = useCallback(() => {
        dispatch({ type: 'PREV_STEP'})
    }, [dispatch]);
    
    useEffect(() => {
        saveLocalData(state.formData)
    }, [state.formData]);

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
                onNextStep={onNextStep}
                onPrevStep={onPrevStep}
                step={state.step}
                user={state.formData}
                onChange={updateFormData}
            />

        </div>
    );
};

export default CreateUser;
