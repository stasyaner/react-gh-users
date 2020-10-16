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
        pushPage: (state): void => {
            state.pages = [...state.pages, state.currPage + 1];
        },
        prependPage: (state, action: PayloadAction<number>): void => {
            state.pages = [action.payload, ...state.pages];
        },
    },
});

export const { setPage, pushPage, prependPage } = paginationSlice.actions;

export const loadNextPage = (pageNum?: number): AppThunk => async (dispatch, getState): Promise<void> => {
    await dispatch(fetchUserList());
    dispatch(pushPage());

    if (!pageNum) return;
    const { pages } = getState().pagination;
    const numOfLoaded = pages.length;
    for (let i = numOfLoaded; i <= (pageNum - numOfLoaded); i++) {
        await dispatch(fetchUserList());
        dispatch(prependPage(i));
    }
};

export const loadPage = (pageNum: number): AppThunk => (dispatch, getState): void => {
    const { userList: { items } } = getState();
    const startSlice = (pageNum - 1) * USERS_PER_PAGE;
    const newItemsToShow = items.slice(startSlice, startSlice + USERS_PER_PAGE);
    dispatch(setItemsToShow(newItemsToShow));
};

export const selectCurrPage = (state: RootState): PaginationState["currPage"] => state.pagination.currPage;
export const selectPages = (state: RootState): PaginationState["pages"] => state.pagination.pages;

export default paginationSlice.reducer;
