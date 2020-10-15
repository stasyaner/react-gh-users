import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { fetchUserList, setItemsToShow, USERS_PER_PAGE } from "../userList/userListSlice";

type PaginationState = {
    currPage: number;
    pages: number[];
};

const initialState: PaginationState = {
    currPage: 1,
    pages: [],
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>): void => {
            state.currPage = action.payload;
        },
        pushPage: (state/* , action: PayloadAction<number> */): void => {
            state.pages = [...state.pages, state.currPage + 1];
        },
    },
});

export const { setPage, pushPage } = paginationSlice.actions;

export const loadNextPage = (): AppThunk => (dispatch, getState): void => {
    const { userList: { items }, pagination: { currPage } } = getState();
    const startSlice = (currPage - 1) * USERS_PER_PAGE;
    const newItemsToShow = items.slice(startSlice, startSlice + USERS_PER_PAGE);
    if (newItemsToShow.length > 0) {
        dispatch(setItemsToShow(newItemsToShow));
    } else {
        dispatch(fetchUserList());
    }
};

export const loadPrevPage = (): AppThunk => (dispatch, getState): void => {
    const { userList: { items }, pagination: { currPage } } = getState();
    const startSlice = (currPage - 1) * USERS_PER_PAGE;
    const newItemsToShow = items.slice(startSlice, startSlice + USERS_PER_PAGE);
    dispatch(setItemsToShow(newItemsToShow));
};

export const selectCurrPage = (state: RootState): PaginationState["currPage"] => state.pagination.currPage;
export const selectPages = (state: RootState): PaginationState["pages"] => state.pagination.pages;

export default paginationSlice.reducer;
