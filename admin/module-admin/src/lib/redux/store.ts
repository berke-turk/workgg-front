import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import fetchLoadingReducer from './features/fetchLoadingSlice'
import sidebarReducer from './features/sidebarSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetchLoading: fetchLoadingReducer,
    sidebar: sidebarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch