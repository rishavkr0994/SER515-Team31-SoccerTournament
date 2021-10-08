import { useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice';

export default function Submit() {
    useDispatch(setUser({
        email : "xiaoxiao"
    }))
}