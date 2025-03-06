import {ChangeEvent} from "react";
import {IUser} from "../../../entities/user.ts";
import {getTextFromEvent} from "../../../shared/util/text.ts";

interface IComponentProps{
    user: IUser;
}

const ContactInfoStep = ({user}: IComponentProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log(getTextFromEvent(e))
    }

    return (
        <div>
            <h2>مرحله ۲: اطلاعات تماس</h2>
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
            <button>اطلاعات شخصی</button>
            <button>اطلاعات شغل</button>
        </div>
    );
};

export default ContactInfoStep;
