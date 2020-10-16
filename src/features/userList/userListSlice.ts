import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request as ghRestRequest } from "@octokit/request";
import {
    UsersListResponseData,
    RequestParameters,
    OctokitResponse,
} from "@octokit/types";
import parseLinkHeader from "parse-link-header";
import { AppThunk, RootState } from "../../app/store";
import { toast } from "react-toastify";

export const USERS_PER_PAGE = 10;

type UserListState = {
    items: UsersListResponseData;
    itemsToShow: UsersListResponseData;
    isFetching: boolean;
    nextLink: string | null;
};

const initialState: UserListState = {
    items: [],
    itemsToShow: [],
    isFetching: false,
    nextLink: null,
};

export const userListSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {
        startFetching: (state): void => {
            state.isFetching = true;
        },
        pushItems: (state, action: PayloadAction<UsersListResponseData>): void => {
            state.items = [...state.items, ...action.payload];
        },
        stopFetching: (state): void => {
            state.isFetching = false;
        },
        setNextLink: (state, action: PayloadAction<string | null>): void => {
            state.nextLink = action.payload;
        },
        setItemsToShow: (state, action: PayloadAction<UsersListResponseData>): void => {
            state.itemsToShow = [...action.payload];
        },
    },
});

export const { startFetching, stopFetching, pushItems, setNextLink, setItemsToShow } = userListSlice.actions;

export const fetchUserList = (): AppThunk => async (dispatch, getState): Promise<void> => {
    dispatch(startFetching());

    let res: OctokitResponse<UsersListResponseData> | null = null;
    const reqParams: RequestParameters = {
        "per_page": USERS_PER_PAGE,
    };
    // GitHub limits number of request per hour for non-authenticated users to 60
    if (process.env.REACT_APP_GH_PERSONAL_TOKEN) {
        reqParams.headers = {
            authorization: `token ${process.env.REACT_APP_GH_PERSONAL_TOKEN}`,
        };
    }

    try {
        const { nextLink } = getState().userList;
        res = await ghRestRequest( (nextLink as "GET /users") ?? "GET /users", reqParams);
    } catch (e) {
        toast.error(e.message);
    }

    if (res?.data) {
        dispatch(pushItems(res.data));
        dispatch(setItemsToShow(res.data));
    } else {
        toast.error("Unexpected server return");
    }

    if (res?.headers?.link) {
        const linkHeader = parseLinkHeader(res.headers.link);
        dispatch(setNextLink(linkHeader?.next.url ?? null));
    }

    dispatch(stopFetching());
};

export const selectUserList = (state: RootState): UserListState["items"] => state.userList.itemsToShow;

export default userListSlice.reducer;
