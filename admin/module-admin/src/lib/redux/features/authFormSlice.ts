import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthFormState {
    email: string | null,
    password: string | null,
}

const initialState: AuthFormState = {
    email: null,
    password: null
}

export const authFormSlice = createSlice({
    name: 'auth-form',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
})

export const { setEmail, setPassword } = authFormSlice.actions

export default authFormSlice.reducer