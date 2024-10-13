import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
    value: string
}

const initialState: ThemeState = {
    value: "white",
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.value += state.value == 'dark' ? 'white' : 'dark';
        },
    },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer