import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserChats, getUserMessages, receiveSocketMessage, sendMessage } from "../../actions/chatAction.js";
import InputEmoji from 'react-input-emoji';
import { format } from 'timeago.js';
import './ChatBox.css';
import { useRef } from "react";

const ChatBox = (props) => {
    
    const { allUsers } = useSelector((state) => state.authReducer);
    const messages = useSelector((state) => state.chatReducer.messages);
    const userId = props.data.members.find((id) => id !== props.currentUserId)
    const userData = allUsers.find((user) => user._id === userId);

    const [newMessage, setNewMessage] = useState("");
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const scroll = useRef();
    
    useEffect(() => {
        dispatch(getUserMessages(props.data._id));
        // scroll.current.scrollIntoView();
    }, [props.data]);

    useEffect(() => {
        if (props.receiveMessage !== null && props.receiveMessage.chatId === props.data._id) {
            console.log("Data received: ", props.receiveMessage);
            dispatch(receiveSocketMessage(props.receiveMessage));
        }
    }, [props.receiveMessage])

    
    const handleChange = (e) => {
        setNewMessage(e);
    }

    const handleSend = (e) => {
        e.preventDefault();
        const message = {
            senderId: props.currentUserId,
            chatId: props.data._id,
            text: newMessage,
            createdAt: Date.now()
        };

        dispatch(sendMessage(message));

        const receiverId = props.data.members.find((id) => id !== props.currentUserId);
        props.setSendMessage( {...message, receiverId: receiverId} )
        setNewMessage('');
    }
    
    console.log(messages);

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
        <div className="ChatBox-container">
            <>
            <div className="chat-header">
                <div className="follower">
                    <div>
                        { props.isOnline ?  <div className="online-dot" style={{ position: 'relative', left: '4rem'}}></div> : ''}
                        <img src={userData.profilePicture ? serverPublic + userData.profilePicture : serverPublic + "defaultProfile.png"} alt=""
                        className="followerImage"
                        style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
                        <div className="name" style={{ fontSize: "0.8rem" }}>
                            <span>
                                {userData.firstname} {userData.lastname}
                            </span>
                            { props.isOnline ? 'Online' : ''}
                        </div>
                    </div>
                </div>
                <hr style={{ width: '85%', border: '0.1px solid #ececec' }}/>
            </div>
            <div className="chat-body">
                {messages.map((message) => {
                    if (message !== '') {
                        return (
                            <>
                                <div ref={scroll} className={message.senderId === props.currentUserId ? 'message own' : 'message'}>
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span> 
                                </div>
                            </>
                        )
                    }
                })}
            </div>
            <div className="chat-sender">
                <div>+</div>
                <InputEmoji value={newMessage} onSubmit={handleSend} onChange={handleChange}/>
                <div className="send-button button" onClick={handleSend}>Send</div>
            </div>
            </>
        </div>
        </>
    )
};

export default ChatBox;