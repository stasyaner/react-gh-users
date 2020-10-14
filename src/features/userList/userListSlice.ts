import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request as ghRestRequest } from "@octokit/request";
import { UsersListResponseData, RequestParameters } from "@octokit/types";
import parseLinkHeader from "parse-link-header";
import { AppThunk, RootState } from "../../app/store";

type UserListState = {
    items: UsersListResponseData;
    isFetching: boolean;
};

const initialState: UserListState = {
    items: [],
    isFetching: false,
};

export const userListSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {
        startFetching: (state): void => {
            state.isFetching = true;
        },
        pushUsers: (state, action: PayloadAction<UsersListResponseData>): void => {
            state.items = action.payload;
        },
        stopFetching: (state): void => {
            state.isFetching = false;
        },
    },
});

export const { startFetching, stopFetching, pushUsers } = userListSlice.actions;

export const fetchUserList = (): AppThunk => async (dispatch): Promise<void> => {
    dispatch(startFetching());
    try {
        const reqParams: RequestParameters = {
            "per_page": 10,
            // "since": pageNum ? (10 * (parseInt(pageNum, 10) - 1) - 1) : 0,
        };
        // GitHub limits number of request per hour for non-authenticated users to 60
        if (process.env.REACT_APP_GH_PERSONAL_TOKEN) {
            reqParams.headers = {
                authorization: `token ${process.env.REACT_APP_GH_PERSONAL_TOKEN}`,
            };
        }
        const res = await ghRestRequest("GET /users", reqParams);
        dispatch(pushUsers(res.data));
        if (res.headers.link) {
            const linkHead = parseLinkHeader(res.headers.link);
            console.log(linkHead);
        }
        // TODO: revisit when the decision on whether to use iterator or just request is made
        /* let i = 0;
        for await (const res of ghRequest("GET /users")) {
            console.log(res.data);
            i += res.data.length;
            if (i > 100) break;
        } */
    } catch (e) {
        // TODO: notify about the error
        console.log(e.message);
    }
    dispatch(stopFetching());
};

export const selectUserList = (state: RootState): UserListState["items"] => state.userList.items;

export default userListSlice.reducer;
