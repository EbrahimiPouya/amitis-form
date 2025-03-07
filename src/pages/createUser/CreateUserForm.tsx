import {IUser} from "../../entities/user.ts";
import {ChangeEvent, useCallback} from "react";
import {stepsConfig} from './model/formConfig.ts'
import StepLayout from "./ui/StepLayout.tsx";
import {getTextFromEvent} from "../../shared/util/text.ts";

interface IComponentProps{
    user: IUser;
    onChange: (key: keyof IUser, value: string)=>void;
    step: number;
    onNextStep: ()=>void;
    onPrevStep: ()=>void;
}

const CreateUserForm = ({user, onChange, onNextStep, onPrevStep, step}: IComponentProps) => {


    const onChangeGen = useCallback((key: keyof IUser)=>{
        return (e: ChangeEvent<HTMLInputElement>)=> onChange(key , getTextFromEvent(e))
    }, [onChange])

    const currentStep = stepsConfig[step];

    return (
        <div>
            <StepLayout
                title={currentStep.title}
                hasPrev={step > 0}
                hasNext={true}
                prevLabel={step > 0 ? stepsConfig[step-1].title : ""}
                nextLabel={step < stepsConfig.length - 1 ? stepsConfig[step+1].title : "ایجاد کاربر"}
                onPrev={onPrevStep}
                onNext={onNextStep}
            >

                {currentStep.fields.map((field) => (
                    <input
                        key={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={user[field.name]}
                        onChange={onChangeGen(field.name)}
                    />
                ))}
            </StepLayout>
        </div>
    );
};

export default CreateUserForm;
