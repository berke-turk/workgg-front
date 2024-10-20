import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import fetchLoadingReducer from './features/fetchLoadingSlice'
import authFormReducer from './features/authFormSlice'
import themeReducer from './features/themeSlice'
import sidebarReducer from './features/sidebarSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetchLoading: fetchLoadingReducer,
    authform: authFormReducer,
    theme: themeReducer,
    sidebar: sidebarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch