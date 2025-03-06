import PersonalInfoStep from "./ui/PersonalInfoStep.tsx";
import {IUser} from "../../entities/user.ts";
import JobInfoStep from "./ui/JobInfoStep.tsx";
import ContactInfoStep from "./ui/ContactInfoStep.tsx";
import {useState} from "react";

const user: IUser = {
    name: 'ali',
    family: 'ali',
    email: 'a.ali@gmail.com',
    phone_number: '09121111111',
    job: '',
    job_description: ''
}

const CreateUserForm = () => {
    const [step, setStep] = useState(1);

    const onNextStep=()=>{
        setStep(prevState => prevState+1)
    }
    const onPrevStep=()=>{
        setStep(prevState => prevState-1)
    }

    return (
        <div>
        {step === 1 &&
            <PersonalInfoStep
                user={user}
                onNext={onNextStep}
            />
        }
        {step === 2 &&
            <ContactInfoStep
                user={user}
                onNext={onNextStep}
                onPrev={onPrevStep}
            />
        }
        {step === 3 &&
            <JobInfoStep
                user={user}
                onPrev={onPrevStep}
            />
        }
        </div>
    );
};

export default CreateUserForm;
