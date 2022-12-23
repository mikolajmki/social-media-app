import * as PostApi from '../api/postRequest.js';

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const { data } = await PostApi.getTimelinePosts(id);
        console.log(data);
        dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (err) {
        dispatch({ type: "RETREIVING_FAIL" });
        console.log(err);
    }
};