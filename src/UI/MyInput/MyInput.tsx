import React from "react";
import { useDispatch } from "react-redux";
import { changeInputValueAC } from "../../redux/actionCreators";

interface IMyInputProps {
    inputValue: string,
    className: string,
}

export default function MyInput(props: IMyInputProps) {

    const dispatch = useDispatch();

    return(
        <input className={props.className} type="text" value={props.inputValue} onChange={(e) => dispatch(changeInputValueAC(e.currentTarget.value))}/>
    )
}