import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FetchLoadingState {
    value: number,
    isActive: boolean
}

const initialState: FetchLoadingState = {
    value: 0,
    isActive: false
}

export const fetchLoadingSlice = createSlice({
    name: 'fetchLoading',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        setActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload
        }
    },
})

export const { increment, incrementByAmount, setActive } = fetchLoadingSlice.actions

export default fetchLoadingSlice.reducer