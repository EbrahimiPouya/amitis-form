import PersonalInfoStep from "./ui/PersonalInfoStep.tsx";
import {IUser} from "../../entities/user.ts";
import JobInfoStep from "./ui/JobInfoStep.tsx";
import ContactInfoStep from "./ui/ContactInfoStep.tsx";

const user: IUser = {
    name: 'ali',
    family: 'ali',
    email: 'a.ali@gmail.com',
    phone_number: '09121111111',
    job: '',
    job_description: ''
}

const CreateUserForm = () => {
    return (
        <div>
            <PersonalInfoStep user={user}/>
            <ContactInfoStep user={user}/>
            <JobInfoStep user={user}/>
        </div>
    );
};

export default CreateUserForm;
