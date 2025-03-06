import {ChangeEvent} from "react";

export const getTextFromEvent = (e : ChangeEvent<HTMLInputElement>)=>{
    return e.target.value
}
