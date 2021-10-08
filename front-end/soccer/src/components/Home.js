import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import GetUser from '../util/GetUser'

export default function Home() {  
    const userInfo = GetUser()
    const dispatch = useDispatch()
    function dispathcUser() {
        dispatch(setUser({
            email: "xiaoxiao"
        }))
    }

        return (
            <div className="Main">
                <p>Hello</p>
                {console.log(userInfo)}
                {userInfo.email}
                <Button onClick={()=>dispathcUser()}>Click</Button>
            </div>
        )
        
}








