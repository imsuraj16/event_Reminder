import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice.js'

export const store = configureStore({
    reducer : {
        user : userSlice
    }
})