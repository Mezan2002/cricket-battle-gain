import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPlayer } from "../../types/Players";

type TInitialPlayer = {
  players: TPlayer[];
};

const initialState: TInitialPlayer = {
  players: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<TPlayer>) => {
      const isPlayerExist = state.players.some(
        (player) => player.id === action.payload.id
      );

      if (isPlayerExist) {
        state.players = state.players.filter(
          (player) => player.id !== action.payload.id
        );
      } else {
        state.players.push(action.payload);
      }
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload
      );
    },
  },
});

export const { addPlayer, removePlayer } = playersSlice.actions;

export default playersSlice.reducer;
