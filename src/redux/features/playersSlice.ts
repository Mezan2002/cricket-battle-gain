import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPlayer } from "../../types/Players";

type TInitialPlayer = {
  players: TPlayer[];
};

const initialState: TInitialPlayer = {
  players: [],
};
console.log("🚀 ~ initialState: TInitialPlayer.players:", initialState.players);

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, actions: PayloadAction<TPlayer>) => {
      state.players.push(actions.payload);
    },
  },
});

export const { addPlayer } = playersSlice.actions;

export default playersSlice.reducer;
