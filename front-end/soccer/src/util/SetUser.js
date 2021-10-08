import { useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice';

export default function SetUser() {
    const dispatch = useDispatch()
        dispatch(setUser({
            email: "xiaoxiao"
        }))
}