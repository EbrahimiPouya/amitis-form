import {IUser} from "../../../entities/user.ts";
const FORM_DATA_KEY = "formData"
const localData = localStorage.getItem(FORM_DATA_KEY);

export const initialFormData: IUser =
    localData ? JSON.parse(localData) :
    {   name: '',
        family: '',
        email: '',
        phone_number: '',
        job: '',
        job_description: ''
    }

export const saveLocalData = (formData: IUser)=>{
        localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
}

export const removeLocalData=()=>{
        localStorage.removeItem(FORM_DATA_KEY)
}
