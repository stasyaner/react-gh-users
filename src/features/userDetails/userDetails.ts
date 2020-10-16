import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { request as ghRestRequest } from "@octokit/request";
import {
    RequestParameters,
    OctokitResponse,
    UsersGetByUsernameResponseData,
    Endpoints
} from "@octokit/types";
import { AppThunk, RootState } from "../../app/store";
import { toast } from "react-toastify";

export const USERS_PER_PAGE = 10;

type UserDetailsState = {
    isFetching: boolean;
    details: UsersGetByUsernameResponseData | null;
};

const initialState: UserDetailsState = {
    isFetching: false,
    details: null,
};

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        startFetching: (state): void => {
            state.isFetching = true;
        },
        setDetails: (state, action: PayloadAction<UsersGetByUsernameResponseData>): void => {
            state.details = action.payload;
        },
        stopFetching: (state): void => {
            state.isFetching = false;
        },
    },
});

export const { startFetching, stopFetching, setDetails } = userDetailsSlice.actions;

export const fetchUserDetails = (username: string): AppThunk<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(startFetching());

    let res: OctokitResponse<UsersGetByUsernameResponseData> | null = null;
    const reqParams: RequestParameters & Endpoints["GET /users/:username"]["parameters"] = {
        username,
    };
    // GitHub limits number of request per hour for non-authenticated users to 60
    if (process.env.REACT_APP_GH_PERSONAL_TOKEN) {
        reqParams.headers = {
            authorization: `token ${process.env.REACT_APP_GH_PERSONAL_TOKEN}`,
        };
    }

    try {
        res = await ghRestRequest("GET /users/:username", reqParams);
    } catch (e) {
        toast.error(e.message);
    }

    if (res?.data) {
        dispatch(setDetails(res.data));
    } else {
        toast.error("Unexpected server return");
    }

    dispatch(stopFetching());
};

export const selectUserDetails = (state: RootState): UserDetailsState["details"] => state.userDetails.details;

export default userDetailsSlice.reducer;
