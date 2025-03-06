import PersonalInfoStep from "./ui/PersonalInfoStep.tsx";

const CreateUserForm = () => {
    return (
        <div>
            <PersonalInfoStep user={{
                name: 'ali',
                family: 'ali',
                email: 'a.ali@gmail.com',
                phone_number: '09121111111',
                job: '',
                job_description: ''
            }}/>
        </div>
    );
};

export default CreateUserForm;
