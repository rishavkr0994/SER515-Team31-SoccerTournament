import { useSelector } from "react-redux";

export default function GetUser(){
    const state = useSelector(state => state)
    const userInfo = state.userInfo;
    console.log(userInfo);
    return userInfo;
}