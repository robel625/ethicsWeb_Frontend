import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id : "",
  name : "",
  email : "",
  profile_pic : "",
  token : "",
  ticket: "",
  onlineUser : [],
  socketConnection : null,
  peer: [],
  call: null,
  chatTo: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state,action)=>{
        state._id = action.payload._id
        state.name = action.payload.name 
        state.email = action.payload.email 
        state.profile_pic = action.payload.profile_pic 
    },
    setToken : (state,action)=>{
        state.token = action.payload
    },
    setTicket : (state,action)=>{
      state.ticket = action.payload
    },
    logout : (state,action)=>{
        state._id = ""
        state.name = ""
        state.email = ""
        state.profile_pic = ""
        state.token = ""
        state.socketConnection = null
        state.peer = []
    },
    setOnlineUser : (state,action)=>{
      state.onlineUser = action.payload
    },
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
    },
    setPeer : (state,action)=>{
      state.peer = action.payload
    },
    setCall : (state,action)=>{
      state.call = action.payload
    },
    setChat_to: (state,action)=>{
      state.chatTo = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken , setTicket, logout, setOnlineUser,setSocketConnection, setPeer, setCall, setChat_to } = userSlice.actions

export default userSlice.reducer