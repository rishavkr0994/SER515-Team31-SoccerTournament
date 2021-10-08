import { Button } from '@mui/material'
import React, { Component } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

export default function Home() {  
    const userInfo = GetUser()
    const dispatch = useDispatch()
        return (
            <div className="Main">
                <p>Hello</p>
                {console.log(userInfo)}
                {userInfo.email}
                <Button onClick={()=>{
                    dispatch(setUser({
                        email: "xiaoxiao"
                    }))
                }}>Click</Button>
            </div>
        )
}

function GetUser(){
    const state = useSelector(state => state)
    const userInfo = state.userInfo;
    console.log(userInfo);
    return userInfo;
}







