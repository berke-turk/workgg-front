import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import sidebarReducer from './features/sidebarSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    abece: counterReducer,
    sidebar: sidebarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch