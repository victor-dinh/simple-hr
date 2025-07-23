import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  messageType: ""
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const { message, messageType } = action.payload;
      state.message = message;
      state.messageType = messageType || "info";
    },
    clearMessage: (state) => {
      state.message = "";
      state.messageType = "";
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;