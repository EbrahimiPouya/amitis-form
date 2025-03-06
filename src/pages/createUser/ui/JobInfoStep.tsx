import {IUser} from "../../../entities/user.ts";
import {ChangeEvent} from "react";
import {getTextFromEvent} from "../../../shared/util/text.ts";
import StepLayout from "./StepLayout.tsx";

interface IComponentProps{
    user: IUser;
}

const JobInfoStep = ({user}: IComponentProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log(getTextFromEvent(e))
    }

    return (
        <div>
            <StepLayout
                title={'اطلاعات شغل'}
                hasPrev={true}
                prevLabel={'اطلاعات تماس'}
                onPrev={()=>{}}
            >
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
            <button>ایجاد کاربر</button>
            </StepLayout>
        </div>
    );
};

export default JobInfoStep;
