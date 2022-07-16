import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../interfaces/Project';

export interface projectState {
    id: string;
    loadProjectDetail: boolean;
    tasks: ITask[]
  }
  
  const initialState: projectState = {
    id: '',
    loadProjectDetail: false,
    tasks:[]
  }

  export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    triggerToGetProjectDetail: (state, actions:PayloadAction<boolean>) => {
      state.loadProjectDetail = actions.payload
    },
    updateTasksInStore: (state, actions: PayloadAction<ITask[]>) => {
      console.log(actions.payload,'state')
        state.tasks = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { triggerToGetProjectDetail,updateTasksInStore } = projectSlice.actions

export default projectSlice.reducer