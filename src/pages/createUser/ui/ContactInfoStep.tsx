import {ChangeEvent} from "react";
import {IUser} from "../../../entities/user.ts";
import {getTextFromEvent} from "../../../shared/util/text.ts";
import StepLayout from "./StepLayout.tsx";

interface IComponentProps{
    user: IUser;
}

const ContactInfoStep = ({user}: IComponentProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log(getTextFromEvent(e))
    }

    return (
        <div>
            <StepLayout
                title={'اطلاعات تماس'}
                hasNext={true}
                nextLabel={'اطلاعات شغل'}
                onNext={()=>{}}
                hasPrev={true}
                prevLabel={'اطلاعات شخصی'}
                onPrev={()=>{}}
            >
            <input
                type="text"
                placeholder="ایمیل"
                defaultValue={user.email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="شماره تماس"
                value={user.phone_number}
                onChange={onChange}
            />
            </StepLayout>
        </div>
    );
};

export default ContactInfoStep;
