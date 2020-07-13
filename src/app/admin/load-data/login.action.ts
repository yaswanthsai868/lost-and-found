import {createAction,props} from '@ngrx/store'

export const loginAction=createAction('[Admin Login Success] Login Data',props<{adminObj:any}>())