import {configureStore} from '@reduxjs/toolkit'
import userInfoReducer from './userSlice'

export default configureStore({
    reducer:{
        userInfo:userInfoReducer,
    },
});