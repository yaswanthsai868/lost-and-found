import {createReducer,on} from '@ngrx/store'
import { loginAction } from './login.action'

export const loginReducer=createReducer(
    {},on(loginAction,(state,{adminObj})=>{
        return {
            ...state,
            adminData:adminObj
        }
    })
)