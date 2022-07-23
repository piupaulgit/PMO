import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProject} from '../interfaces/Project';

export interface projectState {
    projectDetail: any;
    loadProjectDetail: boolean;
  }
  
  const initialState: projectState = {
    projectDetail: {},
    loadProjectDetail: false,
  }

  export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateCurrentProjectDetail: (state,actions:PayloadAction<any>) => {
      state.projectDetail=actions.payload
    },
    triggerToGetProjectDetail: (state, actions:PayloadAction<boolean>) => {
      state.loadProjectDetail = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { triggerToGetProjectDetail, updateCurrentProjectDetail} = projectSlice.actions

export default projectSlice.reducer