import {IUser} from "../../entities/user.ts";
import {ChangeEvent, useState} from "react";
import {stepsConfig} from './model/formConfig.ts'
import StepLayout from "./ui/StepLayout.tsx";
import {getTextFromEvent} from "../../shared/util/text.ts";

const user: IUser = {
    name: 'ali',
    family: 'ali',
    email: 'a.ali@gmail.com',
    phone_number: '09121111111',
    job: '',
    job_description: ''
}

const CreateUserForm = () => {
    const [step, setStep] = useState(0);

    const onNextStep=()=>{
        if(step < stepsConfig.length - 1){
            setStep(prevState => prevState+1)
        } else {
            alert("کاربر ایجاد شد")
        }
    }
    const onPrevStep=()=>{
        setStep(prevState => prevState-1)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log(getTextFromEvent(e))
    }


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
                        defaultValue={user[field.name]}
                        onChange={onChange}
                    />
                ))}
            </StepLayout>
        </div>
    );
};

export default CreateUserForm;
