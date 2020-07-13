import {createReducer,on} from '@ngrx/store'
import { userLoginAction } from './userdata.action'

export const userLoginReducer=createReducer({},on(userLoginAction,(state,{userData})=>{
    return {
        ...state,
        userData
    }
}))