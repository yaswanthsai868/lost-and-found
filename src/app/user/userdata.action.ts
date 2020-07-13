import {createAction,props} from '@ngrx/store'

export const userLoginAction= createAction('[User Login success] Login Data',props<{userData:any}>())