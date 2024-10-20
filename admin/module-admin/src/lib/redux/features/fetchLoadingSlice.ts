import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FetchLoadingState {
    isActive: boolean
}

const initialState: FetchLoadingState = {
    isActive: false
}

export const fetchLoadingSlice = createSlice({
    name: 'fetchLoading',
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload
        }
    },
})

export const { setActive } = fetchLoadingSlice.actions

export default fetchLoadingSlice.reducer