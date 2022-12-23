import * as UserApi from '../api/userRequest.js';

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" });
    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({ type: "UPDATING_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "UPDATING_FAIL" });
    }
}

export const followUser = (id, data) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER", data: data._id });
    await UserApi.followUser(id, data);
}

export const unfollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER", data: data._id });
    await UserApi.unfollowUser(id, data);
}

export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await UserApi.getAllUsers();
        console.log(data);
        dispatch({ type: "GET_USERS_SUCCESS", data: data});
    } catch (err) {
        console.log(err);
    }
}