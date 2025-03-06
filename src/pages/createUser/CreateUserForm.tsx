import PersonalInfoStep from "./ui/PersonalInfoStep.tsx";

const CreateUserForm = () => {
    return (
        <div>
            <PersonalInfoStep user={{
                name: 'ali',
                family: 'ali'
            }}/>
        </div>
    );
};

export default CreateUserForm;
