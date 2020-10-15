import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userListReducer from "../features/userList/userListSlice";
import paginationReducer from "../features/pagination/paginationSlice";

export const store = configureStore({
    reducer: {
        userList: userListReducer,
        pagination: paginationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, RootState, unknown, Action<string>>;
