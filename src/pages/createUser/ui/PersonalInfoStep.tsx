import {IUser} from "../../../entities/user.ts";
import {ChangeEvent} from "react";
import {getTextFromEvent} from "../../../shared/util/text.ts";

interface IComponentProps{
    user: IUser;
}

const PersonalInfoStep = ({user}: IComponentProps) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log(getTextFromEvent(e))
    }

    return (
        <div>
            <h2>مرحله ۱: اطلاعات شخصی</h2>
            <input
                type="text"
                placeholder="نام"
                defaultValue={user.name}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="نام خانوادگی"
                value={user.family}
                onChange={onChange}
            />
            <button>اطلاعات تماس</button>
        </div>
    );
};

export default PersonalInfoStep;
