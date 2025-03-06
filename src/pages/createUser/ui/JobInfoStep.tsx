import {IUser} from "../../../entities/user.ts";
import {ChangeEvent} from "react";
import {getTextFromEvent} from "../../../shared/util/text.ts";

interface IComponentProps{
    user: IUser;
}

const JobInfoStep = ({user}: IComponentProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log(getTextFromEvent(e))
    }

    return (
        <div>
            <h2>مرحله ۳: اطلاعات شغل</h2>
            <input
                type="text"
                placeholder="شغل"
                defaultValue={user.job}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="توضیحات شغل"
                value={user.job_description}
                onChange={onChange}
            />
            <button>اطلاعات تماس</button>
            <button>ایجاد کاربر</button>
        </div>
    );
};

export default JobInfoStep;
