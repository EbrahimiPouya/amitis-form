import {IUser} from "../../../entities/user.ts";
import {ChangeEvent} from "react";
import {getTextFromEvent} from "../../../shared/util/text.ts";
import StepLayout from "./StepLayout.tsx";

interface IComponentProps{
    user: IUser;
}

const PersonalInfoStep = ({user}: IComponentProps) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log(getTextFromEvent(e))
    }

    return (
        <div>
            <StepLayout
                title={'اطلاعات شخصی'}
                hasNext={true}
                nextLabel={'اطلاعات تماس'}
                onNext={()=>{}}
                >
                <div >
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
                </div>

            </StepLayout>
        </div>
    );
};

export default PersonalInfoStep;
