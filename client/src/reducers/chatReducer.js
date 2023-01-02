const chatReducer = (state = { loading: false, error: false, chats: [], messages: [] }, action) => {
    switch(action.type) {
        case "GET_CHATS_START":
            return { ...state, loading: true };
        case "GET_CHATS_SUCCESS":
            return { ...state, loading: false, chats: action.data };
        case "GET_CHATS_FAIL":
            return { ...state, loading: false, error: true };
        case "GET_MESSAGES_START":
            return { ...state, loading: true };
        case "GET_MESSAGES_SUCCESS":
            return { ...state, loading: false, messages: action.data };
        case "GET_MESSAGES_FAIL":
            return { ...state, loading: false, error: true };
        case "SEND_MESSAGE_START":
            return { ...state, loading: true };
        case "SEND_MESSAGE_SUCCESS":
            return { ...state, loading: false, messages: [ ...state.messages, action.data.message] };
        case "SEND_MESSAGE_FAIL":
            return { ...state, loading: false, error: true };
        case "SOCKET_MESSAGE":
            return { ...state, messages: [ ...state.messages, action.data ]};
        default:
            return state;
    }
};

export default chatReducer;