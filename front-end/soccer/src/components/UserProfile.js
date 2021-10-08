import React from 'react';
import GetUser from '../util/GetUser';

export default function UserProfile() {
    const userInfo = GetUser()
    return(
        <div>Hi {userInfo.firstName}!</div>
    )
}