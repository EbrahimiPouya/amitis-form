import {IUser} from "../../../entities/user.ts";

interface IStepsConfig {
    title: string
    fields: {
        name: keyof IUser;
        type: string
        placeholder: string
    }[]
}

export const stepsConfig: IStepsConfig[] = [
    {
        title: "اطلاعات شخصی",
        fields: [
            { name: "name", type: "text", placeholder: "نام" },
            { name: "family", type: "text", placeholder: "نام خانوادگی" }
        ]
    },
    {
        title: "اطلاعات تماس",
        fields: [
            { name: "email", type: "text", placeholder: "ایمیل" },
            { name: "phone_number", type: "text", placeholder: "شماره تماس" }
        ]
    },
    {
        title: "اطلاعات شغلی",
        fields: [
            { name: "job", type: "text", placeholder: "سمت شغلی" },
            { name: "job_description", type: "text", placeholder: "توضیحات شغل" }
        ]
    }
];
