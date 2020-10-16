import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
        pushCurrPage: (state): void => {
            state.pages = [...state.pages, state.currPage];
        },
        pushPage: (state, action: PayloadAction<number>): void => {
            state.pages = [...state.pages, action.payload];
        },
    },
});

export const { setPage, pushPage, pushCurrPage } = paginationSlice.actions;

export const fetchNextPage = (): AppThunk => async (dispatch): Promise<void> => {
    await dispatch(fetchUserList());
    dispatch(pushCurrPage());
};

export const fetchRandomPage = (pageNum: number): AppThunk => async (dispatch): Promise<void> => {
    for (let i = 0; i < pageNum; i++) {
        // if page is loading longer than a second
        const showLoadingTimer = setTimeout(() => {
            toast.info(`Loading page ${i + 1}`, { pauseOnFocusLoss: false });
        }, 1000);
        await dispatch(fetchUserList());
        clearTimeout(showLoadingTimer);
        dispatch(pushPage(i + 1));
        dispatch(setPage(i + 1));
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
