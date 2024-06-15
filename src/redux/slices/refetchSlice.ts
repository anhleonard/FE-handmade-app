import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    time: 1
}

export const refetchSlice = createSlice({
  name: 'refetch',
  initialState,
  reducers: {
    refetchComponent: (state) => {
        state.time = state.time + 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { refetchComponent } = refetchSlice.actions

export default refetchSlice.reducer